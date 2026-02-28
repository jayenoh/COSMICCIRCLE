import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, JSON, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base


class Compatibility(Base):
    __tablename__ = "compatibilities"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    contact_id = Column(String, ForeignKey("contacts.id"), nullable=False, unique=True)
    soulmate_score = Column(Integer, nullable=False)
    compatibility_category = Column(String, nullable=False)
    compatibility_data = Column(JSON, nullable=False)
    synastry_story = Column(Text, nullable=True)
    last_calculated = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="compatibilities")
    contact = relationship("Contact", back_populates="compatibility")
