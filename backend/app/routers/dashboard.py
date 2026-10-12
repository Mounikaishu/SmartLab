from fastapi import APIRouter

router = APIRouter()


@router.get("/dashboard/overview")
def overview():
    # TODO Member 4: compute counts from the database; do not hardcode demo metrics.
    return {"success": True, "data": {
        "total_computers": 0,
        "online_computers": 0,
        "offline_computers": 0,
        "occupied_computers": 0,
        "active_sessions": 0,
        "interrupted_sessions": 0
    }}
