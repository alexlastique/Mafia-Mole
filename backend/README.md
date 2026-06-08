# Backend

This folder contains the FastAPI backend for Mafia-Mole.

## Requirements

- Python 3.11+
- MySQL database access
- A local `db_config.json` file

## Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Create your local database settings from the example file:

```powershell
Copy-Item "db_config exemple.json" "db_config.json"
```

Then update `db_config.json` with your MySQL credentials.

## Run the API

```powershell
uvicorn main:app --host 0.0.0.0 --port 8000
```

For development with auto-reload:

```powershell
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Tests

```powershell
pytest
```

## Main features

- REST endpoints for room creation, joining, quitting, and game status
- WebSocket support for live room updates
- MySQL-backed persistence for rooms and players