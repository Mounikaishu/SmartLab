# SmartLab API Contract (Initial)

Base path: `/api/v1` (recommended; align all router prefixes to this before implementation).

## Planned endpoint groups

- `auth`: staff login/session management and role checks.
- `computers`: register/list computers, retrieve status, receive heartbeats.
- `sessions`: start/end sessions and query session history.
- `events`: accept validated agent events.
- `dashboard`: summary counts and reporting queries.

## Contract rules

- Use JSON request/response bodies for REST endpoints.
- Use UTC timestamps in ISO 8601 format.
- Return consistent HTTP status codes and error schemas.
- Authenticate staff and devices separately; each device should have unique revocable credentials.
- Do not trust a computer ID supplied by a client without validating its device identity.
- Keep database access inside the backend.
- Enable CORS only for the actual Vercel frontend origin.
- Publish endpoint request/response examples here before parallel implementation.

## Status

These endpoint groups are planning guidance, not confirmation that all routes are implemented.
