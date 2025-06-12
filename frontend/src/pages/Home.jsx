import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BattleForm from '../components/Home/BattleForm';
import ModeToggle from '../components/Home/ModeToggle';

const Home = () => {
  const [gameState, setGameState] = useState('solo');
  const [resetErrorTrigger, setResetErrorTrigger] = useState(false);
  const navigate = useNavigate();

  const onChangeMode = (mode) => {
    setGameState(mode);
    setResetErrorTrigger(prev => !prev);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Home</h2>
      <ModeToggle
        gameState={gameState}
        onChangeMode={onChangeMode}
      />
      {gameState === 'solo' ? (
        <>
          <h2>1人プレイ</h2>
          <button onClick={() => navigate("/solo")}>ゲーム開始</button>
        </>
      ) : (
        <BattleForm resetErrorTrigger={resetErrorTrigger} />
      )}
    </div>
  );
}

export default Home;