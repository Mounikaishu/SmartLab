from fastapi import APIRouter, Query

router = APIRouter()


@router.post("/agent/computers/register")
def register_computer():
    # TODO Member 4: authenticate agent, validate payload, persist registration.
    return {"success": True, "data": {"status": "not_implemented", "owner": "Member 4"}}


@router.post("/agent/computers/heartbeat")
def heartbeat():
    # TODO Member 4: authenticate agent and update last_seen_at.
    return {"success": True, "data": {"status": "not_implemented", "owner": "Member 4"}}


@router.get("/computers")
def list_computers(
    status: str | None = Query(default=None),
    search: str | None = Query(default=None),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
):
    # TODO Member 4: query registered computers and return paginated results.
    return {"success": True, "data": {"items": [], "limit": limit, "offset": offset, "status_filter": status, "search": search}}


@router.get("/computers/{computer_id}")
def get_computer(computer_id: str):
    # TODO Member 4: return one computer or HTTP 404.
    return {"success": True, "data": {"computer_id": computer_id, "status": "not_implemented"}}
