from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import User, DepthPreference
from app.schemas.user import UserCreate, LoginRequest, AuthResponse, UserResponse
from app.services.auth import hash_password, verify_password, create_access_token
from app.mock.natal_charts import generate_mock_natal_chart

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup", response_model=AuthResponse, status_code=201)
async def signup(data: UserCreate, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(select(User).where(User.email == data.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    chart = generate_mock_natal_chart(data.birthdate, data.birth_time, data.birth_location)

    user = User(
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password),
        birthdate=data.birthdate,
        birth_time=data.birth_time,
        birth_location=data.birth_location,
        depth_preference=DepthPreference.SUN_ONLY,
        natal_chart_data=chart,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    token = create_access_token(user.id)
    return AuthResponse(
        user=UserResponse.model_validate(user),
        token=token,
    )


@router.post("/login", response_model=AuthResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(user.id)
    return AuthResponse(
        user=UserResponse.model_validate(user),
        token=token,
    )
