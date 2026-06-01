from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List
from pydantic import BaseModel

import json
import mysql.connector


class JoinRequest(BaseModel):
    id_user: int

class RoomCreateRequest(BaseModel):
    roomId: str
    nbJoueurs: int
    latitude: float
    longitude: float

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

@app.post("/corpse/create")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/corpse/find")
async def call_meeting(corpse_id: int):
    await broadcast("{\"meeting\": " + json.dumps(corpse_id) + "}")
    return {"message": "Corpse found : " + str(corpse_id)}

@app.post("/room/create")
def create_room(req: RoomCreateRequest):
    roomId = req.roomId
    nbJoueurs = req.nbJoueurs
    latitude = req.latitude
    longitude = req.longitude
    rayon = 200
    
    print(f"roomID: {roomId}, nbJoueurs: {nbJoueurs}, latitude: {latitude}, longitude: {longitude}")

    # creer un json avec les infos de la room
    room_info = {
        "roomId": roomId,
        "nbJoueurs": nbJoueurs,
        "latitude": latitude,
        "longitude": longitude,
        "rayon": rayon
    }

    room_status = {"status": "waiting"}

    cursor = conn.cursor()
    
    cursor.execute("INSERT INTO game (Parameter_, Status) VALUES (%s, %s)", (json.dumps(room_info), json.dumps(room_status)))
    conn.commit()
    return {"message": "Room created successfully"}

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

@app.post("/room/quit/{room_id}")
async def quit_room(room_id: int, req: JoinRequest):
    id_user = req.id_user
    cursor = conn.cursor()

    cursor.execute("SELECT Id FROM user WHERE Id = %s", (id_user,))
    user_exists = cursor.fetchone()

    if not user_exists:
        cursor.execute("INSERT INTO user (Id, Pseudo) VALUES (%s, %s)", (id_user, f"User {id_user}"))
        conn.commit()

    # cursor.execute("INSERT INTO `mafiamole`.`game` (`Id`, `Parameter_`, `Status`) VALUES ('1', 'teste', 'test')")
    cursor.execute("UPDATE user SET Id_1 = null WHERE Id = %s", (id_user,))
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

@app.post("/room/start/{room_id}")
async def start_room(room_id: int):
    await broadcast("{\"start\": true}")
    print("Start game for room", room_id)
    return {"start": True}

@app.post("/room/finish/{room_id}")
async def finish_room(room_id: int):
    await broadcast("{\"end\": true}")
    print("Finish game for room", room_id)
    return {"end": True}

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
