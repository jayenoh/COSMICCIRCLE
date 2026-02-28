from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.routers import auth, users, contacts, compatibility, stories
from app.mock.seed_data import seed


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    await seed()
    yield


app = FastAPI(
    title="CosmicCircle API",
    version="0.1.0",
    lifespan=lifespan,
    redirect_slashes=False,  # Prevent 307 redirects that break iOS fetch auth headers
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev (emulator, web, etc.)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(contacts.router)
app.include_router(compatibility.router)
app.include_router(stories.router)


@app.get("/")
async def root():
    return {"status": "ok", "app": "CosmicCircle API", "version": "0.1.0"}
