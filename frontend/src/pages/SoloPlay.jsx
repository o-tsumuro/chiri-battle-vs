import { useState } from 'react';
import ResultScreen from './ResultScreen.jsx';
import SoloPlayContainer from "../components/SoloPlayContainer";

const SoloPlay = ({ onRetry }) => {
  const [gameState, setGameState] = useState('playing');
  const [resultData, setResultData] = useState({ distance: null, initialCoords: null, markerPosition: null });

  const handleFinish = ({ distance, initialCoords, markerPosition }) => {
    setResultData({ distance, initialCoords, markerPosition });
    setGameState('result');
  };

  return (
    <>
      {gameState === 'playing' && <SoloPlayContainer onFinish={handleFinish} />}
      {gameState === 'result' && <ResultScreen result={resultData} onRetry={onRetry} />}
    </>
  );
}

export default SoloPlay;