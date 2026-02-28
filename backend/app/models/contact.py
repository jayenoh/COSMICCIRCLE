import enum
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Date, Enum, JSON, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base


class RelationshipTag(str, enum.Enum):
    FRIEND = "friend"
    PARTNER = "partner"
    FAMILY = "family"
    COWORKER = "coworker"
    CRUSH = "crush"
    EX = "ex"


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    birthdate = Column(Date, nullable=False)
    birth_time = Column(String, nullable=True)
    birth_location = Column(String, nullable=True)
    relationship_tag = Column(Enum(RelationshipTag), nullable=False)
    natal_chart_data = Column(JSON, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="contacts")
    compatibility = relationship(
        "Compatibility", back_populates="contact", uselist=False, cascade="all, delete-orphan"
    )
