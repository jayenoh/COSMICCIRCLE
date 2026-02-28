from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.database import get_db
from app.models.user import User
from app.models.contact import Contact, RelationshipTag
from app.models.compatibility import Compatibility
from app.schemas.contact import ContactCreate, ContactUpdate, ContactResponse
from app.services.auth import get_current_user
from app.mock.natal_charts import generate_mock_natal_chart

router = APIRouter(prefix="/api/contacts", tags=["contacts"])


def _to_response(contact: Contact, score: Optional[int] = None) -> ContactResponse:
    return ContactResponse(
        id=contact.id,
        user_id=contact.user_id,
        name=contact.name,
        birthdate=contact.birthdate,
        birth_time=contact.birth_time,
        birth_location=contact.birth_location,
        relationship_tag=contact.relationship_tag.value if isinstance(contact.relationship_tag, RelationshipTag) else contact.relationship_tag,
        natal_chart_data=contact.natal_chart_data,
        notes=contact.notes,
        soulmate_score=score,
    )


@router.get("", response_model=list[ContactResponse])
async def list_contacts(
    tag: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(Contact).where(Contact.user_id == current_user.id)
    if tag:
        query = query.where(Contact.relationship_tag == RelationshipTag(tag))
    query = query.order_by(Contact.name)

    result = await db.execute(query)
    contacts = result.scalars().all()

    # Fetch scores
    responses = []
    for c in contacts:
        score_result = await db.execute(
            select(Compatibility.soulmate_score).where(Compatibility.contact_id == c.id)
        )
        score = score_result.scalar_one_or_none()
        responses.append(_to_response(c, score))

    return responses


@router.post("", response_model=ContactResponse, status_code=201)
async def create_contact(
    data: ContactCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    chart = generate_mock_natal_chart(data.birthdate, data.birth_time, data.birth_location)

    contact = Contact(
        user_id=current_user.id,
        name=data.name,
        birthdate=data.birthdate,
        birth_time=data.birth_time,
        birth_location=data.birth_location,
        relationship_tag=RelationshipTag(data.relationship_tag),
        natal_chart_data=chart,
        notes=data.notes,
    )
    db.add(contact)
    await db.commit()
    await db.refresh(contact)
    return _to_response(contact)


@router.get("/{contact_id}", response_model=ContactResponse)
async def get_contact(
    contact_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Contact).where(Contact.id == contact_id, Contact.user_id == current_user.id)
    )
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    score_result = await db.execute(
        select(Compatibility.soulmate_score).where(Compatibility.contact_id == contact.id)
    )
    score = score_result.scalar_one_or_none()
    return _to_response(contact, score)


@router.put("/{contact_id}", response_model=ContactResponse)
async def update_contact(
    contact_id: str,
    data: ContactUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Contact).where(Contact.id == contact_id, Contact.user_id == current_user.id)
    )
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    if data.name is not None:
        contact.name = data.name
    if data.birthdate is not None:
        contact.birthdate = data.birthdate
    if data.birth_time is not None:
        contact.birth_time = data.birth_time
    if data.birth_location is not None:
        contact.birth_location = data.birth_location
    if data.relationship_tag is not None:
        contact.relationship_tag = RelationshipTag(data.relationship_tag)
    if data.notes is not None:
        contact.notes = data.notes

    # Regenerate chart if birth details changed
    if data.birthdate is not None or data.birth_time is not None or data.birth_location is not None:
        contact.natal_chart_data = generate_mock_natal_chart(
            contact.birthdate, contact.birth_time, contact.birth_location
        )

    await db.commit()
    await db.refresh(contact)
    return _to_response(contact)


@router.delete("/{contact_id}")
async def delete_contact(
    contact_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Contact).where(Contact.id == contact_id, Contact.user_id == current_user.id)
    )
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    await db.delete(contact)
    await db.commit()
    return {"message": "Contact deleted"}
