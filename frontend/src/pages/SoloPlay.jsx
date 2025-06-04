import { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import ResultScreen from './ResultScreen.jsx';
import SoloPlayContainer from "../components/SoloPlayContainer";

const SoloPlay = () => {
  const [gameKey, setGameKey] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const [resultData, setResultData] = useState({ distance: null, initialCoords: null, markerPosition: null });
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

   const handleRetry = () => {
    setGameKey(prev => prev + 1);
    setGameState('playing');
   }

  const handleFinish = ({ distance, initialCoords, markerPosition }) => {
    setResultData({ distance, initialCoords, markerPosition });
    setGameState('result');
  };

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey} key={gameKey}>
        {gameState === 'playing' &&  <SoloPlayContainer onFinish={handleFinish} />}
        {gameState === 'result' && <ResultScreen result={resultData} onRetry={handleRetry} />}
      </LoadScript>
    </>
  );
}

export default SoloPlay;