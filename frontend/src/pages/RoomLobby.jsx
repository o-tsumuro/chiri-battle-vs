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
  const logEndRef = useRef(null);
  const ws = useRef(null);
  
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${roomId}?user_name=${userName}`);
    ws.current = socket;

    socket.onopen = () => {
        if (!opponentUserNameRef.current) {
          addLog("ルームを作成しました。");
          addLog("相手の参加を待っています。");
        } else {
          addLog(`${opponentUserNameRef.current} のルームに参加しました。`);
        }
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "user_joined") {
        if (data.userName !== userName) {
          setOpponentUserName(data.userName);
          opponentUserNameRef.current = data.userName;
          addLog(`${data.userName} がルームに参加しました。`);
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

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const addLog = (text) => {
    setLogs((prev) => [...prev, text]);
  }

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div>
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
        <div
          style={{
            border: '1px solid #ccc',
            padding: 10,
            height: 100,
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
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