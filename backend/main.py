from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List
from pydantic import BaseModel

import json
import mysql.connector


class JoinRequest(BaseModel):
    id_user: int

app = FastAPI()
with open("db_config.json", "r") as f:
    param = json.load(f)
    
conn = mysql.connector.connect(
    host=param["host"],
    user=param["user"],
    password=param["password"],
    database=param["database"]
)


clients: List[WebSocket] = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    print(f"Client connecté ({len(clients)})")

    try:
        while True:
            data = await websocket.receive_text()
            print("Message reçu:", data)

            # broadcast à TOUS
            for client in clients:
                if client != websocket:
                    await client.send_text(data)

    except WebSocketDisconnect:
        clients.remove(websocket)
        print(f"Client déconnecté ({len(clients)})")

async def broadcast(message: str):
    dead_clients = []
    for client in clients:
        try:
            await client.send_text(message)
        except:
            dead_clients.append(client)

    for dc in dead_clients:
        clients.remove(dc)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/corpse/create")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/corpse/find")
async def read_item(item_id: int, q: str | None = None):
    await broadcast(f"Corpse trouvé: {item_id}")
    return {"item_id": item_id, "q": q}

@app.post("/room/create")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/room/join/{room_id}")
async def join_room(room_id: int, req: JoinRequest):
    id_user = req.id_user
    cursor = conn.cursor()

    cursor.execute("SELECT Id FROM user WHERE Id = %s", (id_user,))
    user_exists = cursor.fetchone()

    if not user_exists:
        cursor.execute("INSERT INTO user (Id, Pseudo) VALUES (%s, %s)", (id_user, f"User {id_user}"))
        conn.commit()

    # cursor.execute("INSERT INTO `mafiamole`.`game` (`Id`, `Parameter_`, `Status`) VALUES ('1', 'teste', 'test')")
    cursor.execute("UPDATE user SET Id_1 = %s WHERE Id = %s", (room_id, id_user))
    conn.commit()
    
    cursor.execute("SELECT Id, Pseudo, Premium FROM user WHERE Id_1 = %s", (room_id,))
    playerInRoom = []
    
    for row in cursor.fetchall():
        playerInRoom.append({
            "id": row[0],
            "name": row[1],
            "status": "default",
            "skin": "default",
            "premium": row[2] if row[2] is not None else False
        })
    await broadcast("{\"playerInRoom\": " + json.dumps(playerInRoom) + "}")
    
    return {"playerInRoom": playerInRoom}

@app.get("/room/code")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.get("/room/parameter")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/player/pseudo")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.get("/player/pseudo")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.get("/player/premium")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/player/skin/equip")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/player/skin/buy")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/player/coin/buy")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.get("/map/pois")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/map/poi/done")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.get("/map/poi")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
