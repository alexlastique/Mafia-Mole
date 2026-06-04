# Mafia-Mole

Mafia-Mole is a location-based multiplayer game project with:

- a FastAPI backend for rooms, player sessions, and WebSocket events
- an Expo React Native frontend for the game experience
- a small static landing page for presentation

## Project structure

- backend/ — Python/FastAPI API and database integration
- frontend/ — Expo app (React Native + Expo Router)
- landing/ — static HTML/CSS/JS landing page

## Quick start

### Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Create your local database config by copying `backend/db_config exemple.json` to `backend/db_config.json`, then update the credentials for your MySQL setup.

Run the API:

```powershell
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend

```powershell
cd frontend
npm install
npx expo start
```

## Notes

- The backend exposes REST endpoints and WebSocket room events.
- The frontend is configured with Expo Router and Jest for tests.
- The landing page can be opened directly from `landing/index.html`.
