import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useWebSocket } from '../hooks/useWebSocket';
import LogPanel from '../components/LogPanel';

const RoomLobby = () => {
  const location = useLocation();
  const { userName, roomId } = location.state;
  const [opponentUserName, setOpponentUserName] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (text) => {
    setLogs((prev) => [...prev, text]);
  }

  useWebSocket({
    userName,
    roomId,
    onLog: addLog,
    onOpponentChange: setOpponentUserName,
  });

  return (
    <div>
      <h2>ルームID: {roomId}</h2>
      <div>{userName}(あなた)</div>
      {opponentUserName && <div>{opponentUserName}(相手)</div>}
      <LogPanel logs={logs} />
    </div>
  );
}

export default RoomLobby;