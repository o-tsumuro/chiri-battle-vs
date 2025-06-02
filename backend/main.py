from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

rooms = {}

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
  await websocket.accept()

  if room_id not in rooms:
    rooms[room_id] = []

  if len(rooms[room_id]) >= 2:
    await websocket.send_text("error:room_full")
    await websocket.close()
    return
  
  rooms[room_id].append(websocket)
  
  try:
    while True:
      data = await websocket.receive_text()
      for client in rooms[room_id]:
        await client.send_text(data)
  except WebSocketDisconnect:
    print('切断されました')
    rooms[room_id].remove(websocket)
    if len(rooms[room_id]) == 0:
      del rooms[room_id]