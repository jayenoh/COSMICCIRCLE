from pydantic import BaseModel
from typing import Any, Optional
from datetime import datetime


class CompatibilityResponse(BaseModel):
    id: str
    user_id: str
    contact_id: str
    soulmate_score: int
    compatibility_category: str
    compatibility_data: dict[str, Any]
    synastry_story: Optional[str] = None
    last_calculated: datetime

    class Config:
        from_attributes = True


class StoryResponse(BaseModel):
    title: str
    chapters: list[dict[str, str]]
    contact_name: str
    user_sign: str
    contact_sign: str
