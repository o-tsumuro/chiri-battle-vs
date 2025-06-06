from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import re

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

rooms = {}
names = set()

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, user_name: str = Query(...)):
  await websocket.accept()

  if room_id not in rooms:
    rooms[room_id] = []

  rooms[room_id].append({"name": user_name, "ws": websocket})
  names.add(user_name)

  if len(rooms[room_id]) == 1:
    await websocket.send_json({
      "type": "self_joined_first",
    })
  else:
    opponent = rooms[room_id][0]
    await websocket.send_json({
      "type": "self_joined_second",
      "opponentName": opponent["name"],
    })
    await opponent["ws"].send_json({
      "type": "opponent_joined",
      "userName": user_name,
    })
  
  try:
    while True:
      msg = await websocket.receive_text()

      for client in rooms[room_id]:
        await client["ws"].send_text(msg)

  except WebSocketDisconnect:
    print('切断されました')
    rooms[room_id] = [member for member in rooms[room_id] if member["ws"] != websocket]
    names.discard(user_name)

    for member in rooms.get(room_id, []):
      await member["ws"].send_json({
        "type": "user_left",
        "userName": user_name,
      })

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