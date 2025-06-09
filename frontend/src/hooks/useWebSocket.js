import { useRef, useEffect } from 'react';

export const useWebSocket = ({ userName, roomId, onLog, onOpponentChange }) => {
  const ws = useRef(null);
  const opponentRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${roomId}?user_name=${userName}`);
    ws.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "self_joined_first") {
        onLog("ルームを作成しました。");
        onLog("相手の入室を待っています。");
      }

      if (data.type === "self_joined_second") {
        opponentRef.current = data.opponentName;
        onOpponentChange(data.opponentName);
        onLog(`${data.opponentName} のルームに入室しました。`);
      }

      if (data.type === "opponent_joined") {
        opponentRef.current = data.userName;
        onOpponentChange(data.userName);
        onLog(`${data.userName} がルームに参加しました。`);
      }

      if (data.type === "user_left") {
        if (data.userName === opponentRef.current) {
          onLog(`${data.userName} が退室しました。`);
          opponentRef.current = null;
          onOpponentChange(null);
        }
      }
    };

    socket.onclose = () => {
      console.log("WebSocket切断");
    };

    return () => {
      socket.close();
    };
  }, [userName, roomId]);

  return ws;
}