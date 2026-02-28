from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import User
from app.models.contact import Contact
from app.models.compatibility import Compatibility
from app.schemas.compatibility import CompatibilityResponse
from app.services.auth import get_current_user
from app.mock.compatibility_data import generate_mock_compatibility

router = APIRouter(prefix="/api/compatibility", tags=["compatibility"])


async def _get_or_calculate(
    contact_id: str, db: AsyncSession, user: User, force: bool = False,
) -> Compatibility:
    # Find contact
    result = await db.execute(
        select(Contact).where(Contact.id == contact_id, Contact.user_id == user.id)
    )
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    # Check existing
    if not force:
        existing = await db.execute(
            select(Compatibility).where(Compatibility.contact_id == contact_id)
        )
        compat = existing.scalar_one_or_none()
        if compat:
            return compat

    # Calculate
    user_chart = user.natal_chart_data or {}
    contact_chart = contact.natal_chart_data or {}
    data = generate_mock_compatibility(user_chart, contact_chart, user.depth_preference.value)

    # Upsert
    existing = await db.execute(
        select(Compatibility).where(Compatibility.contact_id == contact_id)
    )
    compat = existing.scalar_one_or_none()

    if compat:
        compat.soulmate_score = data["overall_score"]
        compat.compatibility_category = data["category"]
        compat.compatibility_data = data
    else:
        compat = Compatibility(
            user_id=user.id,
            contact_id=contact_id,
            soulmate_score=data["overall_score"],
            compatibility_category=data["category"],
            compatibility_data=data,
        )
        db.add(compat)

    await db.commit()
    await db.refresh(compat)
    return compat


@router.get("/{contact_id}", response_model=CompatibilityResponse)
async def get_compatibility(
    contact_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    compat = await _get_or_calculate(contact_id, db, current_user)
    return CompatibilityResponse.model_validate(compat)


@router.post("/{contact_id}/recalculate", response_model=CompatibilityResponse)
async def recalculate_compatibility(
    contact_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    compat = await _get_or_calculate(contact_id, db, current_user, force=True)
    return CompatibilityResponse.model_validate(compat)
