import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useWebSocket } from '../hooks/useWebSocket';
import LogPanel from '../components/LogPanel';
import RoomInfo from '../components/RoomInfo';
import StartButton from '../components/StartButton';

const RoomLobby = () => {
  const location = useLocation();
  const { userName, roomId } = location.state;
  const [opponentUserName, setOpponentUserName] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isOpponentReady, setIsOpponentReady] = useState(false);

  const addLog = (text) => {
    setLogs((prev) => [...prev, text]);
  };

  const toggleReady = () => {
    setIsReady(prev => {
      const nextReady = !prev;
      ws.current.send(JSON.stringify({
        type: "toggle_ready",
        ready: nextReady,
      }));
      return nextReady;
    });
  };

  const ws = useWebSocket({
    userName,
    roomId,
    setIsHost,
    setOpponentUserName,
    setIsOpponentReady,
    onLog: addLog,
  });

  console.log("isHost:", isHost);
  console.log("isReady:", isReady);
  console.log("isOpponentReady:", isOpponentReady);

  return (
    <>
      <RoomInfo
        roomId={roomId}
        userName={userName}
        opponentUserName={opponentUserName}
        isReady={isReady}
        isOpponentReady={isOpponentReady}
        toggleReady={toggleReady}
      />
      <StartButton
        isHost={isHost}
        canStart={isReady && isOpponentReady}
      />
      <LogPanel logs={logs} />
    </>
  );
};

export default RoomLobby;