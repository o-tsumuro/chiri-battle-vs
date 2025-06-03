from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

names = set()
rooms = {}

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, user_name: str, room_id: str):
  await websocket.accept()

  if room_id not in rooms:
    rooms[room_id] = []
  
  names.add(user_name)
  rooms[room_id].append(websocket)
  
  try:
    while True:
      data = await websocket.receive_text()
      for client in rooms[room_id]:
        await client.send_text(data)
  except WebSocketDisconnect:
    print('切断されました')
    rooms[room_id].remove(websocket)
    names.discard(user_name)
    if len(rooms[room_id]) == 0:
      del rooms[room_id]

@app.post("/validate-user")
async def validate_user(request: Request):
  data = await request.json()
  user_name = data.get("user_name", "")
  room_id = data.get("room_id", "")

  if len(user_name) > 20:
    return JSONResponse(status_code=400, content={"error": "invalid_username"})
  if user_name in names:
    return JSONResponse(status_code=400, content={"error": "username_taken"})
  if not re.fullmatch(r"[a-zA-Z0-9]{4,20}", room_id):
      return JSONResponse(status_code=400, content={"error": "invalid_room_id"})
  if len(rooms.get(room_id, [])) >= 2:
      return JSONResponse(status_code=400, content={"error": "room_full"})
  return {"ok": True}