# SmartLab

SmartLab is a college computer-lab access management and usage tracking system. It combines a React web dashboard, a FastAPI backend, PostgreSQL storage, and a C#/.NET Windows Agent installed on lab computers.

## Final technology stack

- **Frontend:** React + JavaScript + Vite
- **CSS framework:** Bootstrap 5
- **Backend:** Python + FastAPI
- **Database:** PostgreSQL
- **Windows Agent:** C#/.NET
- **Communication:** REST APIs over HTTPS
- **Frontend hosting:** Vercel
- **Backend hosting:** Render
- **Database hosting:** Managed PostgreSQL (Render or another compatible provider)

## Architecture

- The React dashboard is deployed on Vercel.
- The FastAPI API is deployed on Render.
- The backend connects to managed PostgreSQL using a private/service connection string where supported.
- Each lab PC runs the C#/.NET Windows Agent locally. The agent communicates with the backend over authenticated HTTPS.
- The browser and Windows Agent never connect directly to PostgreSQL.

## Repository layout

- `frontend/` — React dashboard deployed on Vercel.
- `backend/` — FastAPI service deployed on Render.
- `database/` — SQL reference schema and seed data.
- `windows-agent/` — Windows Agent source and setup notes.
- `docs/` — architecture, API contract, deployment, and team ownership.
- `tests/` — shared test guidance and test suites.

## Team ownership

1. **Member 1:** `windows-agent/` — Windows Agent and secure device communication.
2. **Member 2:** session APIs/services and `frontend/src/pages/Sessions.jsx` — session lifecycle and history.
3. **Member 3:** database schema, backend models/migrations, and tests.
4. **Member 4:** computer registration/status APIs and computer inventory/dashboard UI.

Coordinate changes to shared files such as `backend/app/main.py`, configuration, database models, and the frontend API client before editing them.

## Local development

### Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Create a local, untracked environment file based on `.env.example` and set required values. Never commit real credentials.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` to your local API URL for development. Vite exposes variables prefixed with `VITE_` to browser code, so never put secrets in them.

## Deployment overview

See `docs/DEPLOYMENT.md` for the Vercel and Render setup. Deployment files are starter configuration; configure environment variables and verify build/start commands in each provider before production use.

## Security notes

- Keep `.env` and production secrets out of Git.
- Use HTTPS and authenticated device credentials for agent-to-API requests.
- Restrict API CORS origins to the actual dashboard origin.
- Use managed database credentials and backups.
- Do not store Windows user passwords in SmartLab.
- A normal Windows Agent application cannot independently enforce pre-desktop Windows logon; use approved Windows identity and policy mechanisms for OS-level access control.
