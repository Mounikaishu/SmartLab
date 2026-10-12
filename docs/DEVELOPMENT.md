# Development Setup

## Backend (FastAPI)

```bash
cd backend
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
# source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Swagger/OpenAPI docs: `http://127.0.0.1:8000/docs`

Copy `.env.example` to `.env` and configure the database URL before using database-backed endpoints.

## Frontend (React + JavaScript + Bootstrap 5)

```bash
cd frontend
npm install
npm run dev
```

Vite normally serves the frontend at `http://localhost:5173`.

## Database

Use PostgreSQL. Configure `DATABASE_URL` in `backend/.env`. `database/schema.sql` is a reference schema; coordinate with Member 3 before changing it. If using Docker Compose, review `docker-compose.yml` and set a strong local password via environment variables before starting it.

## Branches

Suggested branch names:
- `feat/windows-agent-events`
- `feat/session-api-history`
- `feat/database-schema`
- `feat/computer-dashboard`

Make changes in your owned files. Shared schema/model changes require coordination and review.
