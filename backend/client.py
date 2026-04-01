import asyncio
import websockets

async def send_messages(websocket):
    while True:
        msg = await asyncio.to_thread(input)  # ✅ non bloquant
        await websocket.send(msg)

async def receive_messages(websocket):
    while True:
        try:
            msg = await websocket.recv()
            print("Reçu:", msg)
        except:
            break

async def main():
    uri = "ws://127.0.0.1:8000/ws"

    async with websockets.connect(uri) as websocket:
        print("Connecté")

        await asyncio.gather(
            send_messages(websocket),
            receive_messages(websocket)
        )

asyncio.run(main())