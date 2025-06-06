from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request, Query
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

rooms = {}
names = set()

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, user_name: str = Query(...)):
  await websocket.accept()

  # ルームの初期化
  if room_id not in rooms:
    rooms[room_id] = []

  # 既にルームにいるユーザーの名前を新規参加者に送る
  for member in rooms[room_id]:
    await websocket.send_json({
      "type": "user_joined",
      "userName": member["name"],
    })
  
  # このユーザーを部屋に登録
  rooms[room_id].append({"name": user_name, "ws": websocket})
  names.add(user_name)

  # 他のクライアントにこのユーザーの参加を通知
  for member in rooms[room_id]:
    if member["ws"] != websocket:
      await member["ws"].send_json({
        "type": "user_joined",
        "userName": user_name,
      })
  
  try:
    while True:
      data = await websocket.receive_text()
      for client in rooms[room_id]:
        await client.send_text(data)
  except WebSocketDisconnect:
    print('切断されました')
    rooms[room_id] = [member for member in rooms[room_id] if member["ws"] != websocket]
    names.discard(user_name)

    for member in rooms.get(room_id, []):
      await member["ws"].send_josn({
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