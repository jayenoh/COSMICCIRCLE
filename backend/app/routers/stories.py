from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import User
from app.models.contact import Contact
from app.models.compatibility import Compatibility
from app.schemas.compatibility import StoryResponse
from app.services.auth import get_current_user
from app.mock.compatibility_data import generate_mock_compatibility
from app.mock.stories import generate_mock_story

router = APIRouter(prefix="/api/stories", tags=["stories"])


@router.get("/{contact_id}", response_model=StoryResponse)
async def get_story(
    contact_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Get contact
    result = await db.execute(
        select(Contact).where(Contact.id == contact_id, Contact.user_id == current_user.id)
    )
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    # Get or create compatibility data
    compat_result = await db.execute(
        select(Compatibility).where(Compatibility.contact_id == contact_id)
    )
    compat = compat_result.scalar_one_or_none()

    user_chart = current_user.natal_chart_data or {}
    contact_chart = contact.natal_chart_data or {}

    if not compat:
        compat_data = generate_mock_compatibility(
            user_chart, contact_chart, current_user.depth_preference.value
        )
    else:
        compat_data = compat.compatibility_data

    story = generate_mock_story(user_chart, contact_chart, compat_data, contact.name)
    return StoryResponse(**story)
