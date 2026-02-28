from pydantic import BaseModel
from datetime import date
from typing import Optional, Any


class ContactCreate(BaseModel):
    name: str
    birthdate: date
    birth_time: Optional[str] = None
    birth_location: Optional[str] = None
    relationship_tag: str
    notes: Optional[str] = None


class ContactUpdate(BaseModel):
    name: Optional[str] = None
    birthdate: Optional[date] = None
    birth_time: Optional[str] = None
    birth_location: Optional[str] = None
    relationship_tag: Optional[str] = None
    notes: Optional[str] = None


class ContactResponse(BaseModel):
    id: str
    user_id: str
    name: str
    birthdate: date
    birth_time: Optional[str] = None
    birth_location: Optional[str] = None
    relationship_tag: str
    natal_chart_data: Optional[dict[str, Any]] = None
    notes: Optional[str] = None
    soulmate_score: Optional[int] = None

    class Config:
        from_attributes = True
