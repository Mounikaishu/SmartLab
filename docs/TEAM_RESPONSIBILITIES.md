# Team Responsibilities

## Member 1 — Windows Agent
- Own `windows-agent/`.
- Implement device identity, heartbeat/event delivery, retry/backoff, and secure HTTPS communication.
- Coordinate payload schemas with backend members.

## Member 2 — Session Management
- Own session router/service and `frontend/src/pages/Sessions.jsx`.
- Implement session lifecycle, usage records, and history UI.
- Coordinate database fields and API contract before coding.

## Member 3 — Database and Tests
- Own `database/`, migrations, model conventions, and shared tests.
- Define relationships, indexes, constraints, and migration workflow.
- Review schema changes with session and computer owners.

## Member 4 — Computer Management and Dashboard
- Own computer registration/status APIs and computer inventory/dashboard pages.
- Implement heartbeat status rules and overview data with the agent owner.

## Shared rules
- Use feature branches and pull requests.
- Avoid editing another member's owned files without coordination.
- Agree on API contracts and database models before parallel implementation.
- Never commit credentials, `.env` files, or production secrets.
