import { useRef, useEffect } from 'react';

export const useWebSocket = ({
  userName,
  roomId,
  setIsHost,
  setOpponentUserName,
  setIsOpponentReady,
  onLog,
  resetReady
}) => {
  const ws = useRef(null);
  const opponentRef = useRef(null);

  const becomeHost = () => setIsHost(true);
  const revokeHost = () => setIsHost(false);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${roomId}?user_name=${userName}`);
    ws.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "self_joined_first") {
        onLog("ルームを作成しました。");
        onLog("相手の入室を待っています。");
        becomeHost();
      }

      if (data.type === "self_joined_second") {
        opponentRef.current = data.opponentName;
        setOpponentUserName(data.opponentName);
        onLog(`${data.opponentName} のルームに入室しました。`);
        revokeHost();
      }

      if (data.type === "opponent_joined") {
        opponentRef.current = data.userName;
        setOpponentUserName(data.userName);
        onLog(`${data.userName} がルームに参加しました。`);
        becomeHost();
      }

      if (data.type === "user_left") {
        if (data.userName === opponentRef.current) {
          onLog(`${data.userName} が退室しました。`);
          opponentRef.current = null;
          setOpponentUserName(null);
          resetReady();
          becomeHost();
        }
      }

      if (data.type === "toggle_opponent_ready") {
        setIsOpponentReady(data.ready);
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