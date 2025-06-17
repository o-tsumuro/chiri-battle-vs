from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
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
async def websocket_endpoint(websocket: WebSocket, room_id: str):
  await websocket.accept()
  user_name = websocket.query_params.get("user_name")

  if room_id not in rooms:
    rooms[room_id] = []

  rooms[room_id].append({
    "name": user_name,
    "ws": websocket,
    "ready": False,
  })
  names.add(user_name)

  opponent = None
  for user in rooms[room_id]:
    if user["name"] != user_name:
      opponent = user
      break

  if opponent is None:
    await websocket.send_json({
      "type": "self_joined_first",
    })
  else:
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
      json_data = json.loads(msg)

      if json_data["type"] == "start_game":
        for member in rooms[room_id]:
          if member["name"] != user_name:
            await member["ws"].send_json({
              "type": "start_game",
            })

      if json_data["type"] == "toggle_ready":
        ready = json_data["ready"]
        
        for member in rooms[room_id]:
          if member["name"] != user_name:
            await member["ws"].send_json({
              "type": "toggle_opponent_ready",
              "ready": ready,
            })

      for client in rooms[room_id]:
        await client["ws"].send_json(json_data)

  except WebSocketDisconnect:
    print('切断されました')
    
    # 切断したときに相手に通知
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