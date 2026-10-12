from fastapi import APIRouter, Header, HTTPException
from app.core.config import settings

router = APIRouter()


@router.post("/agent/events")
def ingest_event(payload: dict, x_agent_key: str | None = Header(default=None)):
    # TODO Member 2: replace simple shared key with per-agent credentials/certificates before deployment.
    if settings.app_env != "development" and x_agent_key != settings.agent_shared_secret:
        raise HTTPException(status_code=401, detail="Invalid agent credentials")
    # TODO: validate a typed schema, validate computer/identity mapping, persist idempotently.
    return {"success": True, "data": {"accepted": True, "status": "not_implemented", "event_id": payload.get("event_id")}}
