import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [gameState, setGameState] = useState('solo');
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const errorMessages = {
    invalid_username: 'ユーザー名が不正です（20文字以下）',
    username_taken: 'このユーザー名はすでに使われています',
    invalid_room_id: 'ルームIDは半角英数字で4〜20文字にしてください',
    room_full: 'このルームは満員です',
  };

  const handleBattleClick = async () => {
    if (!roomId || !userName) {
      setError('ユーザー名とルームIDの両方を入力してください');
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/validate-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: userName, room_id: roomId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(errorMessages[data.error] || "不明なエラーです");
        return;
      }

      setError('');
      navigate('/battle', { state: { userName, roomId } });
    } catch (err) {
      console.error(err);
      setError("通信エラーが発生しました");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Home</h2>
      <button
        onClick={() => (setGameState('solo'), setError(''))}
        disabled={gameState === 'solo'}
      >
        1人プレイ
      </button>
      <button
        onClick={() => setGameState('battle')}
        disabled={gameState === 'battle'}
      >
        1対1
      </button>
      {gameState === 'solo' ? (
        <>
          <h2>1人プレイ</h2>
          <button
            onClick={() => navigate("/solo")}
          >
            ゲーム開始
          </button>
        </>
      ) : (
        <>
          <h2>1対1</h2>
          {error && (
            <div style={{ color: 'red' }}>{error}</div>
          )}
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='名前'
          />
          <br />
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder='ルームID(4~20文字の半角英数字)'
          />
          <br />
          <button
            onClick={handleBattleClick}
          >
            ゲーム開始
          </button>
        </>
      )}
    </div>
  );
}

export default Home;