from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

@pytest.mark.asyncio
async def test_call_meeting(monkeypatch):
    called = {}

    async def fake_broadcast(message: str):
        called["message"] = message

    monkeypatch.setattr("main.broadcast", fake_broadcast)

    response = client.post("/corpse/find?corpse_id=42")

    assert response.status_code == 200
    assert response.json() == {"message": "Corpse found : 42"}

    assert called["message"] == '{"meeting": 42}'