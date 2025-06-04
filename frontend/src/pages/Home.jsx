import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BattleForm from '../components/BattleForm';

const Home = () => {
  const [gameState, setGameState] = useState('solo');
  const [resetErrorTrigger, setResetErrorTriger] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Home</h2>
      <button
        onClick={() => {
          setGameState('solo');
          setResetErrorTriger(prev => !prev);
        }}
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
          <button onClick={() => navigate("/solo")}>ゲーム開始</button>
        </>
      ) : (
        <>
          <h2>1対1</h2>
          <BattleForm resetErrorTrigger={resetErrorTrigger} />
        </>
      )}
    </div>
  );
}

export default Home;