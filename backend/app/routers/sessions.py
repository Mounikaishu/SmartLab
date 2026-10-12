from fastapi import APIRouter, Query

router = APIRouter()


@router.post("/sessions/start")
def start_session(payload: dict):
    # TODO Member 2: normally create this via a validated LOGON event, not an untrusted public call.
    return {"success": True, "data": {"status": "not_implemented", "owner": "Member 2"}}


@router.post("/sessions/end")
def end_session(payload: dict):
    # TODO Member 2: close matching OS session idempotently.
    return {"success": True, "data": {"status": "not_implemented", "owner": "Member 2"}}


@router.get("/sessions/active")
def active_sessions():
    # TODO Member 4: implement using Member 2's shared session service.
    return {"success": True, "data": {"items": []}}


@router.get("/sessions")
def list_sessions(
    student_id: str | None = Query(default=None),
    computer_id: str | None = Query(default=None),
    status: str | None = Query(default=None),
    from_time: str | None = Query(default=None, alias="from"),
    to_time: str | None = Query(default=None, alias="to"),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
):
    # TODO Member 2: implement filters, ordering, pagination and authorization.
    return {"success": True, "data": {"items": [], "limit": limit, "offset": offset}}


@router.get("/sessions/{session_id}")
def get_session(session_id: str):
    # TODO Member 2: return details or HTTP 404; protect with admin authorization.
    return {"success": True, "data": {"session_id": session_id, "status": "not_implemented"}}
