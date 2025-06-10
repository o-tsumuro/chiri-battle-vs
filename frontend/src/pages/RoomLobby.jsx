import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useWebSocket } from '../hooks/useWebSocket';
import LogPanel from '../components/LogPanel';
import ReadyButton from '../components/ReadyButton';
import RoomInfo from '../components/RoomInfo';

const RoomLobby = () => {
  const location = useLocation();
  const { userName, roomId } = location.state;
  const [opponentUserName, setOpponentUserName] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isOpponentReady, setIsOpponentReady] = useState(false);

  const addLog = (text) => {
    setLogs((prev) => [...prev, text]);
  };

  const toggleReady = (target) => {
    if (target === "self") {
      setIsReady(prev => !prev)
    } else if (target === "opponent") {
      setIsOpponentReady(prev => !prev)
    }
  };

  useWebSocket({
    userName,
    roomId,
    onLog: addLog,
    onOpponentChange: setOpponentUserName,
  });

  return (
    <>
      <RoomInfo
        roomId={roomId}
        userName={userName}
        opponentUserName={opponentUserName}
      />
      <ReadyButton
        isReady={isReady}
        isOpponentReady={isOpponentReady}
        toggleReady={toggleReady}
      />
      <LogPanel logs={logs} />
    </>
  );
};

export default RoomLobby;