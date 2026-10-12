from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import computers, dashboard, events, sessions

app = FastAPI(title=settings.app_name, version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Agent-Key"],
)

app.include_router(computers.router, prefix="/api/v1", tags=["computers"])
app.include_router(dashboard.router, prefix="/api/v1", tags=["dashboard"])
app.include_router(events.router, prefix="/api/v1", tags=["events"])
app.include_router(sessions.router, prefix="/api/v1", tags=["sessions"])


@app.get("/health")
def health():
    return {"status": "ok", "service": settings.app_name}
