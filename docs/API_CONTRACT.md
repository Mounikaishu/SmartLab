# SmartLab API Contract (v1)

Base path: `/api/v1`

This contract is the shared agreement. Ask the team before changing paths or payload fields.

## Agent endpoints

### `POST /agent/computers/register`
Register a computer using an authenticated agent identity.
Example request:
```json
{
  "computer_code": "LAB-PC-01",
  "hostname": "LAB-PC-01",
  "lab_location": "Lab A",
  "agent_version": "0.1.0"
}
```

### `POST /agent/computers/heartbeat`
Example request:
```json
{
  "computer_code": "LAB-PC-01",
  "agent_version": "0.1.0",
  "occurred_at": "2026-10-12T03:15:00Z"
}
```

### `POST /agent/events`
Example request (test/sample data only):
```json
{
  "event_id": "LAB-PC-01:session-482:logon:001",
  "computer_code": "LAB-PC-01",
  "event_type": "LOGON",
  "identity_subject": "test-college-user-123",
  "os_session_id": "482",
  "occurred_at": "2026-10-12T03:15:00Z"
}
```
Allowed event types in v1: `LOGON`, `LOGOFF`, `LOCK`, `UNLOCK`, `HEARTBEAT`. Lock/unlock must not start or end a session.

## Admin endpoints

- `GET /dashboard/overview` — total, online, offline, occupied computers, active sessions, interrupted sessions
- `GET /computers` — list computers, with optional `status`, `search`, `limit`, `offset`
- `GET /computers/{computer_id}` — computer details
- `GET /sessions/active` — current sessions
- `GET /sessions` — history, with optional `student_id`, `computer_id`, `from`, `to`, `status`, `limit`, `offset`
- `GET /sessions/{session_id}` — one session's details

## Session lifecycle

- A `LOGON` event opens a session if the identity mapping is valid and the event has not already been processed.
- A `LOGOFF` event closes the matching OS session and records the end time.
- Duplicate `event_id` values must be idempotent and must not create duplicate records.
- If a computer restarts and a session cannot be reconciled, mark it `interrupted`.
- Server validates event source, identity mapping, payload schema, and authorization. Do not trust a client-supplied student ID alone.

## Standard response shape

Success:
```json
{
  "success": true,
  "data": {}
}
```

Error:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "A human-readable message"
  }
}
```

Use ISO-8601 timestamps in UTC. Keep secrets out of request examples and source control.
