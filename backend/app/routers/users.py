from datetime import date
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import User, DepthPreference
from app.models.contact import Contact
from app.schemas.user import UserResponse, UserUpdate, DepthUpdate
from app.services.auth import get_current_user
from app.services.astrology import get_sun_sign
from app.mock.natal_charts import generate_mock_natal_chart
from app.mock.interpretations import DAILY_INSIGHTS, COSMIC_WEATHER, DAILY_CONNECTION_PROMPTS
from app.services.astrology import SIGN_ELEMENTS

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse.model_validate(current_user)


@router.put("/me", response_model=UserResponse)
async def update_me(
    data: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if data.name is not None:
        current_user.name = data.name
    if data.birth_time is not None:
        current_user.birth_time = data.birth_time
    if data.birth_location is not None:
        current_user.birth_location = data.birth_location

    # Regenerate natal chart if birth details changed
    if data.birth_time is not None or data.birth_location is not None:
        current_user.natal_chart_data = generate_mock_natal_chart(
            current_user.birthdate, current_user.birth_time, current_user.birth_location
        )

    await db.commit()
    await db.refresh(current_user)
    return UserResponse.model_validate(current_user)


@router.put("/me/depth", response_model=UserResponse)
async def update_depth(
    data: DepthUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    current_user.depth_preference = DepthPreference(data.depth_preference)
    await db.commit()
    await db.refresh(current_user)
    return UserResponse.model_validate(current_user)


@router.get("/me/daily-insight")
async def get_daily_insight(current_user: User = Depends(get_current_user)):
    """Get a personalized daily cosmic insight based on the user's sun sign."""
    sun_sign = get_sun_sign(current_user.birthdate)
    insights = DAILY_INSIGHTS.get(sun_sign, DAILY_INSIGHTS["aries"])

    # Pick insight based on day of year for daily rotation
    today = date.today()
    day_index = today.timetuple().tm_yday % len(insights)

    return {
        "sign": sun_sign,
        "insight": insights[day_index],
        "date": today.isoformat(),
    }


@router.get("/me/daily-forecast")
async def get_daily_forecast(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a rich daily forecast: cosmic weather, personal insight, and connection spotlights."""
    today = date.today()
    day_of_year = today.timetuple().tm_yday

    # User's sun sign and element
    sun_sign = get_sun_sign(current_user.birthdate)
    user_element = SIGN_ELEMENTS.get(sun_sign, "fire")

    # Daily personal insight
    insights = DAILY_INSIGHTS.get(sun_sign, DAILY_INSIGHTS["aries"])
    day_index = day_of_year % len(insights)

    # Cosmic weather (rotates through transits)
    weather_index = day_of_year % len(COSMIC_WEATHER)
    weather = COSMIC_WEATHER[weather_index]

    # Connection spotlights — pick 2 contacts with date-specific messages
    result = await db.execute(
        select(Contact).where(Contact.user_id == current_user.id)
    )
    contacts = result.scalars().all()

    spotlights = []
    for i, contact in enumerate(contacts):
        contact_sign = get_sun_sign(contact.birthdate)
        contact_element = SIGN_ELEMENTS.get(contact_sign, "fire")

        # Get element pair key (sorted for consistency)
        pair = tuple(sorted([user_element, contact_element]))
        prompts = DAILY_CONNECTION_PROMPTS.get(pair, DAILY_CONNECTION_PROMPTS.get(
            (user_element, contact_element),
            DAILY_CONNECTION_PROMPTS[("fire", "fire")],
        ))

        # Pick a different prompt per contact per day
        prompt_index = (day_of_year + i * 7) % len(prompts)
        message = prompts[prompt_index].format(name=contact.name)

        spotlights.append({
            "contact_id": contact.id,
            "contact_name": contact.name,
            "contact_sign": contact_sign,
            "relationship_tag": contact.relationship_tag.value if hasattr(contact.relationship_tag, 'value') else contact.relationship_tag,
            "message": message,
        })

    # Shuffle deterministically based on day (pick top 2-3)
    spotlights.sort(key=lambda s: hash(s["contact_id"] + str(day_of_year)))
    featured = spotlights[:min(3, len(spotlights))]

    return {
        "date": today.isoformat(),
        "formatted_date": today.strftime("%A, %B %d"),
        "sign": sun_sign,
        "personal_insight": insights[day_index],
        "cosmic_weather": weather,
        "connection_spotlights": featured,
    }
