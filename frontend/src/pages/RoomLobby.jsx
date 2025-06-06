import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RoomLobby = () => {
  const [isMyReady, setIsMyReady] = useState(false);
  const [isOpponentReady, setIsOpponentReady] = useState(false);
  const location = useLocation();
  const { userName, roomId } = location.state;
  const [opponentUserName, setOpponentUserName] = useState(null);
  const opponentUserNameRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const initialJoinRef = useRef(true);
  const ws = useRef(null);
  
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${roomId}?user_name=${userName}`);
    ws.current = socket;

    socket.onopen = () => {
      setTimeout(() => {
        if (!opponentUserNameRef.current) {
          addLog("ルームを作成しました。");
          addLog("相手の参加を待っています。");
        } else {
          addLog(`${opponentUserNameRef.current} のルームに参加しました。`);
        }
        initialJoinRef.current = false;
      }, 500);
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "user_joined") {
        if (data.userName !== userName) {
          setOpponentUserName(data.userName);
          opponentUserNameRef.current = data.userName;
          setTimeout(() => {
            if (initialJoinRef.current) {
              addLog(`${data.userName} がルームに参加しました。`);
            }
          }, 500);
        }
      }
      if (data.type === "user_left") {
        if (data.userName === opponentUserNameRef.current) {
          addLog(`${opponentUserNameRef.current} が退出しました。`);
          setOpponentUserName(null);
          opponentUserNameRef.current = null;
          setIsOpponentReady(false);
        }
      }
    }

    socket.onclose = () => {
      console.log('WebSocket切断');
    };

    return () => {
      socket.close();
    };
  }, [roomId, userName]);

  const addLog = (text) => {
    setLogs((prev) => [...prev, text]);
  }
  
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
      {opponentUserName ? (
        <div>
          {opponentUserName}
        </div>
      ) : (
        <div>

        </div>
      )}
      <div>
        <h3>ログ</h3>
        <ul>
          {logs.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RoomLobby;