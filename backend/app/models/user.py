import enum
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Date, Time, Enum, JSON, DateTime
from sqlalchemy.orm import relationship
from app.database import Base


class DepthPreference(str, enum.Enum):
    SUN_ONLY = "sun_only"
    SUN_MOON_RISING = "sun_moon_rising"
    FULL_CHART = "full_chart"


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    birthdate = Column(Date, nullable=False)
    birth_time = Column(String, nullable=True)
    birth_location = Column(String, nullable=True)
    depth_preference = Column(
        Enum(DepthPreference), default=DepthPreference.SUN_ONLY, nullable=False
    )
    natal_chart_data = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    contacts = relationship("Contact", back_populates="user", cascade="all, delete-orphan")
    compatibilities = relationship("Compatibility", back_populates="user", cascade="all, delete-orphan")
    groups = relationship("Group", back_populates="user", cascade="all, delete-orphan")
