import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RoomLobby = () => {
  const [isMyReady, setIsMyReady] = useState(false);
  const [isOpponentReady, setIsOpponentReady] = useState(false);
  const location = useLocation();
  const { userName, roomId } = location.state;
  const [opponentUserName, setOpponentUserName] = useState(null);
  const ws = useRef(null);
  
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${roomId}`);
    ws.current = socket;

    socket.onclose = () => {
      console.log('WebSocket切断');
    };

    return () => {
      socket.close();
    };
  }, [roomId]);
  
  return (
    <>
      <h2>ルームID: {roomId}</h2>
      <div>
        {userName}(you)
        <button
          onClick={() => setIsMyReady(!isMyReady)}
          style={{ color: isMyReady ? 'green': 'gray' }}
        >
          Ready
        </button>
        </div>
        <div>
      </div>
    </>
  );
}

export default RoomLobby;