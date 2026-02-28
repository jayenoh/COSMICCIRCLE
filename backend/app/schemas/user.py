from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional, Any


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    birthdate: date
    birth_time: Optional[str] = None
    birth_location: Optional[str] = None


class UserUpdate(BaseModel):
    name: Optional[str] = None
    birth_time: Optional[str] = None
    birth_location: Optional[str] = None


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    birthdate: date
    birth_time: Optional[str] = None
    birth_location: Optional[str] = None
    depth_preference: str
    natal_chart_data: Optional[dict[str, Any]] = None

    class Config:
        from_attributes = True


class DepthUpdate(BaseModel):
    depth_preference: str


class LoginRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    user: UserResponse
    token: str
