import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SoloPlay from './pages/SoloPlay';
import Battle from './pages/Battle';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solo" element={<SoloPlay />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
