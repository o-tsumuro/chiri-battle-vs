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
    const socket = new WebSocket(`ws://localhost:8000/ws/${roomId}?user_name=${userName}`);
    ws.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "user_joined") {
        if (data.userName != userName) {
          setOpponentUserName(data.userName);
        }
      }
    }

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
        {userName}(あなた)
        <button
          onClick={() => setIsMyReady(!isMyReady)}
          style={{ color: isMyReady ? 'green': 'gray' }}
        >
          Ready
        </button>
      </div>
      <div>
        {opponentUserName}(相手)

      </div>
    </>
  );
}

export default RoomLobby;