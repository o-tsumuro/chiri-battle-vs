import { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import ResultScreen from './ResultScreen.jsx';
import SoloPlayContainer from "../components/SoloPlayContainer";

const SoloPlay = () => {
  const [gameState, setGameState] = useState('playing');
  const [resultData, setResultData] = useState({ distance: null, initialCoords: null, markerPosition: null });
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleFinish = ({ distance, initialCoords, markerPosition }) => {
    setResultData({ distance, initialCoords, markerPosition });
    setGameState('result');
  };

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey}>
        {gameState === 'playing' &&  <SoloPlayContainer onFinish={handleFinish} />}
        {gameState === 'result' && <ResultScreen result={resultData} />}
      </LoadScript>
    </>
  );
}

export default SoloPlay;