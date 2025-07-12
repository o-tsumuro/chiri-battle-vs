import { Outlet, useParams } from "react-router-dom";
import { useWebSocket } from "../../hooks/useWebSocket";
import { useState } from "react";

const GameSession = () => {
  const { roomId } = useParams();
  const userName = sessionStorage.getItem("userName");
  const [opponentUserName, setOpponentUserName] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isOpponentReady, setIsOpponentReady] = useState(false);

  const addLog = (text) => setLogs((prev) => [...prev, text]);

  const resetReady = () => {
    setIsReady(false);
    setIsOpponentReady(false);
  }

  const ws = useWebSocket({
    userName,
    roomId,
    setIsReady,
    setIsHost,
    setOpponentUserName,
    setIsOpponentReady,
    onLog: addLog,
    resetReady
  });

  return (
    <Outlet context={{
      userName,
      roomId,
      ws,
      opponentUserName,
      isHost,
      logs,
      isReady,
      isOpponentReady,
      setIsReady,
    }} />
  );
};

export default GameSession;