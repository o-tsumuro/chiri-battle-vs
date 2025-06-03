import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [gameState, setGameState] = useState('solo');
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBattleClick = () => {
    if (!roomId || !userName) {
      setError('ユーザー名とルームIDの両方を入力してください');
      return;
    }
    setError('');
    navigate('/battle', { state: { userName, roomId } });
  }

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