# SmartLab

SmartLab is a college computer-lab access management and usage-tracking system. It associates authenticated student identities with registered Windows computers and records session start/end events for an administrator dashboard.

## Components

- `windows-agent/` — C#/.NET Windows event collector and event delivery client (Member 1)
- `backend/` — FastAPI service and shared business logic (Member 2 owns session/event module; Member 4 owns computer/dashboard module)
- `frontend/` — React + JavaScript + Bootstrap 5 admin dashboard (Member 2 owns session history; Member 4 owns dashboard/computer inventory)
- `database/` — PostgreSQL schema, seed data, and migration notes (Member 3)
- `docs/` — shared architecture and API contracts

## Important authentication boundary

Windows/college identity infrastructure must authenticate users. SmartLab must not collect or store Windows or college passwords. A regular desktop executable cannot itself guarantee pre-desktop access enforcement; this requires a supported, managed Windows sign-in configuration. Start development with clearly labelled test events until the college identity integration is approved.

## Local development

1. Install Python 3.11+ and Node.js LTS. Install the .NET SDK only if working on the Windows Agent.
2. Copy `backend/.env.example` to `backend/.env` and set local values. Never commit `.env`.
3. Start PostgreSQL using your local installation or Docker Compose.
4. Follow `docs/DEVELOPMENT.md` to start backend and frontend.
5. Use `docs/API_CONTRACT.md` as the shared agreement for endpoint paths and payloads.

## Team ownership

- Member 1: `windows-agent/`
- Member 2: `backend/app/routers/events.py`, `backend/app/routers/sessions.py`, session service and session history UI
- Member 3: `database/`, database migrations and test strategy
- Member 4: `backend/app/routers/computers.py`, `backend/app/routers/dashboard.py`, computer inventory and dashboard UI
- Shared files (models, API contract, application entry point, dependencies): change by pull request and coordinate first.

## Contribution workflow

Create a feature branch for each task, commit small changes, and open a pull request into `main`. Do not commit secrets. Avoid editing shared files at the same time; agree on changes in the team chat before touching shared models, schema, or application wiring.
