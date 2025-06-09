import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWebSocket } from '../hooks/useWebSocket';

const RoomLobby = () => {
  const [logs, setLogs] = useState([]);
  const [opponentUserName, setOpponentUserName] = useState(null);
  const location = useLocation();
  const { userName, roomId } = location.state;
  const logEndRef = useRef(null);

  const addLog = (text) => {
    setLogs((prev) => [...prev, text]);
  }

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useWebSocket({
    userName,
    roomId,
    onLog: addLog,
    onOpponentChange: setOpponentUserName,
  });

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  return (
    <div>
      <h2>ルームID: {roomId}</h2>
      <div>{userName}(あなた)</div>
      {opponentUserName && <div>{opponentUserName}(相手)</div>}
      
      <div>
        <h3>ログ</h3>
        <div style={{
          border: '1px solid #ccc',
          padding: 10,
          height: 100,
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {logs.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}

export default RoomLobby;