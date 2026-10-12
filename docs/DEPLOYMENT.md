# Deployment: Vercel + Render + PostgreSQL

## Frontend on Vercel

- Connect the GitHub repository to Vercel.
- Set the project root directory to `frontend`.
- Framework preset: Vite (or allow Vercel to detect it).
- Build command: `npm run build`.
- Output directory: `dist`.
- Configure `VITE_API_BASE_URL` to the public HTTPS URL of the deployed Render API.
- Redeploy after changing environment variables.
- `VITE_` variables are included in browser assets; never put credentials in them.

A starter `frontend/vercel.json` is included for SPA route fallback. Review it if the routing approach changes.

## Backend on Render

- Create a Web Service connected to this GitHub repository.
- Set the root directory to `backend`.
- Runtime: Python.
- Build command: `pip install -r requirements.txt`.
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- Configure secret/environment values in Render, including `DATABASE_URL`, the allowed frontend origin, and authentication secrets.
- Ensure the FastAPI application exposes a health endpoint and reads the port/environment configuration correctly.

`backend/render.yaml` is a starter Blueprint configuration; verify the service settings and environment variables in Render before deployment.

## PostgreSQL

- Create a managed PostgreSQL database with your chosen provider.
- Configure the backend with the provider's appropriate internal/private connection URL where available.
- Do not put database credentials in the frontend or commit them to Git.
- Run migrations as a controlled release step and configure backups.

## CORS and authentication

- Allow only the deployed Vercel origin(s) in FastAPI CORS configuration.
- Use HTTPS for browser and agent requests.
- Protect staff endpoints with staff authentication and agent endpoints with device-specific credentials.
- Rotate any real credential that was previously committed.

## Windows Agent

- Install and run the C#/.NET agent on each lab PC using the institution-approved installation process.
- Configure the backend HTTPS URL and unique device credentials.
- Vercel and Render do not host the Windows Agent itself.
- Plan retries, offline handling, updates, and credential revocation.

## Docker

Docker is not required for this hosted deployment. `docker-compose.yml` may remain as an optional local PostgreSQL development convenience, but do not use it as the deployment mechanism for Vercel or Render.
