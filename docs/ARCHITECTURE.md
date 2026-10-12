# SmartLab Architecture

## Deployment components

1. **Frontend — Vercel:** React + JavaScript + Vite + Bootstrap 5. It calls the FastAPI backend over HTTPS.
2. **Backend — Render:** Python + FastAPI exposes REST endpoints for authentication, computer status, sessions, events, and dashboard/report data.
3. **Database — managed PostgreSQL:** stores application users/roles, registered computers, sessions, events, and audit records. Only the backend connects to the database.
4. **Windows Agent — lab PCs:** C#/.NET service or application installed on each managed computer. It sends authenticated heartbeats/events and receives only explicitly supported commands through the API.
5. **GitHub:** source control and collaboration; Vercel and Render can deploy from the same repository using different root directories.

## Request flow

- Staff browser → Vercel frontend → HTTPS REST API on Render → PostgreSQL.
- Windows Agent → authenticated HTTPS REST API on Render → PostgreSQL.
- PostgreSQL is never exposed to the browser or directly to lab PCs.

## Configuration

- Frontend: `VITE_API_BASE_URL` (public API base URL; not a secret).
- Backend: `DATABASE_URL`, authentication/signing secret(s), allowed CORS origins, and any provider-specific settings.
- Windows Agent: backend base URL and per-device credentials/certificate configuration.
- Keep real values in local untracked `.env` files or hosting-provider secret settings, never in committed files.

## Security and reliability

- Require HTTPS and validate authorization on every protected API.
- Use short-lived staff sessions/tokens and unique revocable credentials per device.
- Restrict CORS to the deployed dashboard origin.
- Apply database migrations deliberately and maintain backups.
- Add request validation, rate limits where appropriate, audit logging, and health checks.
- Plan agent retry/backoff and safe offline behavior.
- Do not store Windows passwords. Use the institution's approved identity provider and Windows policies for operating-system login controls.

## Scope note

This repository is an initial scaffold. Hosting configuration does not mean that all API endpoints, authentication, agent behavior, or migrations are already implemented.
