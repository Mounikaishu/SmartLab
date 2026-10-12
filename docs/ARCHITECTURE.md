# SmartLab Architecture

## Runtime flow

1. A student authenticates using the college-approved Windows identity system.
2. A Windows Agent observes supported session events and attaches the registered computer identity.
3. The agent sends an authenticated event over HTTPS to FastAPI.
4. FastAPI validates the agent and event payload, maps the identity subject to a student record, and persists the event/session.
5. PostgreSQL stores computer inventory, identity mappings, sessions, and audit events.
6. React dashboard reads the overview, computer inventory, active sessions, and session history APIs.

## Components

- Windows Agent: event collection, stable computer identity, authenticated delivery, retry queue.
- FastAPI: input validation, agent authentication, event idempotency, session lifecycle, admin API authorization.
- PostgreSQL: relational source of truth.
- React + JavaScript + Bootstrap 5: browser-based admin dashboard.
- College identity provider: authoritative user authentication. Passwords are not stored by SmartLab.

## Key rules

- All timestamps are stored in UTC.
- Each event has a unique idempotency key.
- The server must authenticate the agent; do not trust an arbitrary computer ID supplied by an untrusted client.
- An unresolved session after crash/restart becomes `interrupted` after reconciliation; do not invent a logout time.
- The dashboard must indicate stale computer heartbeat data.
- Only authorized administrators can view student usage history.
