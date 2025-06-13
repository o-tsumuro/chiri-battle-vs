import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Home from './pages/Home';
import SoloPlay from './pages/SoloPlay';
import RoomLobby from './pages/GameSession/RoomLobby';
import Battle from './pages/GameSession/Battle';
import GameSession from './pages/GameSession';

function App() {
  const [gameKey, setGameKey] = useState(0);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleRetry = () => {
    setGameKey(prev => prev + 1);
    setGameState('playing');
  }

  return (
    <BrowserRouter>
      <LoadScript googleMapsApiKey={apiKey} key={gameKey}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solo" element={<SoloPlay onRetry={handleRetry}/>} />
          <Route path="/battle/:roomId" element={<GameSession />} >
            <Route path="lobby" element={<RoomLobby />} />
            <Route index element={<Battle />} />
          </Route>
        </Routes>
      </LoadScript>
    </BrowserRouter>
  );
}

export default App
