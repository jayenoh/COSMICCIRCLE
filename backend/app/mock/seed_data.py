"""Seed data for development. Run with: python -m app.mock.seed_data"""
import asyncio
from datetime import date, datetime
from sqlalchemy import select
from app.database import engine, async_session, Base
from app.models.user import User, DepthPreference
from app.models.contact import Contact, RelationshipTag
from app.models.compatibility import Compatibility
from app.services.auth import hash_password
from app.mock.natal_charts import generate_mock_natal_chart
from app.mock.compatibility_data import generate_mock_compatibility


SEED_USERS = [
    {
        "name": "Cosmic Explorer",
        "email": "cosmic@test.com",
        "password": "cosmic123",
        "birthdate": date(1986, 5, 23),  # Gemini
        "birth_time": "10:30",
        "birth_location": "Pittsburgh, PA",
        "contacts": [
            {"name": "Luna Rivera", "birthdate": date(1996, 7, 8), "tag": "partner",
             "birth_time": "22:15", "birth_location": "Miami, FL"},
            {"name": "Marcus Chen", "birthdate": date(1994, 12, 3), "tag": "friend",
             "birth_time": "06:45", "birth_location": "San Francisco, CA"},
            {"name": "Sofia Petrov", "birthdate": date(1997, 1, 10), "tag": "coworker",
             "birth_time": None, "birth_location": None},
            {"name": "Kai Williams", "birthdate": date(1995, 8, 15), "tag": "crush",
             "birth_time": "14:00", "birth_location": "Austin, TX"},
            {"name": "Alex Morgan", "birthdate": date(1993, 3, 5), "tag": "family",
             "birth_time": "08:30", "birth_location": "Seattle, WA"},
        ],
    },
    {
        "name": "Gabi",
        "email": "gabi@test.com",
        "password": "cosmic123",
        "birthdate": date(1989, 2, 17),  # Aquarius
        "birth_time": "15:45",
        "birth_location": "Pittsburgh, PA",
        "contacts": [
            {"name": "River Delgado", "birthdate": date(1989, 4, 14), "tag": "partner",
             "birth_time": "07:20", "birth_location": "Denver, CO"},
            {"name": "Nadia Kim", "birthdate": date(1991, 9, 2), "tag": "friend",
             "birth_time": "19:00", "birth_location": "Portland, OR"},
            {"name": "Theo Baptiste", "birthdate": date(1988, 1, 22), "tag": "friend",
             "birth_time": "11:30", "birth_location": "New Orleans, LA"},
            {"name": "Mia Santos", "birthdate": date(1992, 6, 17), "tag": "family",
             "birth_time": "03:10", "birth_location": "Phoenix, AZ"},
        ],
    },
]


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as session:
        # Idempotency check: skip if already seeded
        existing = await session.execute(select(User).limit(1))
        if existing.scalar_one_or_none():
            print("Database already seeded, skipping.")
            return

        for seed_user in SEED_USERS:
            # Create user
            chart = generate_mock_natal_chart(
                seed_user["birthdate"], seed_user["birth_time"], seed_user["birth_location"]
            )
            user = User(
                name=seed_user["name"],
                email=seed_user["email"],
                hashed_password=hash_password(seed_user["password"]),
                birthdate=seed_user["birthdate"],
                birth_time=seed_user["birth_time"],
                birth_location=seed_user["birth_location"],
                depth_preference=DepthPreference.SUN_ONLY,
                natal_chart_data=chart,
            )
            session.add(user)
            await session.flush()

            # Create contacts and pre-generate compatibility scores
            contacts = []
            for c in seed_user["contacts"]:
                contact_chart = generate_mock_natal_chart(c["birthdate"], c["birth_time"], c["birth_location"])
                contact = Contact(
                    user_id=user.id,
                    name=c["name"],
                    birthdate=c["birthdate"],
                    birth_time=c["birth_time"],
                    birth_location=c["birth_location"],
                    relationship_tag=RelationshipTag(c["tag"]),
                    natal_chart_data=contact_chart,
                )
                session.add(contact)
                contacts.append((contact, contact_chart))

            await session.flush()  # Generate contact IDs

            # Pre-generate compatibility scores for all contacts
            for contact, contact_chart in contacts:
                data = generate_mock_compatibility(chart, contact_chart, user.depth_preference.value)
                compat = Compatibility(
                    user_id=user.id,
                    contact_id=contact.id,
                    soulmate_score=data["overall_score"],
                    compatibility_category=data["category"],
                    compatibility_data=data,
                    last_calculated=datetime.utcnow(),
                )
                session.add(compat)

            print(f"Seeded user: {user.email} ({len(seed_user['contacts'])} contacts with scores)")

        await session.commit()
        print(f"Done! Seeded {len(SEED_USERS)} users.")


if __name__ == "__main__":
    asyncio.run(seed())
