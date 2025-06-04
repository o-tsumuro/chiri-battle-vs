import { useState } from 'react';
import { useDistanceCalc } from '../hooks/useDistanceCalc';
import { useRandomLocation } from '../hooks/useRandomLocation.js';
import StreetView from './StreetView.jsx';
import MiniMap from './MiniMap.jsx';

const SoloPlayContainer = ({ onFinish }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const { distanceCalc } = useDistanceCalc();
  const initialCoords = useRandomLocation();

  const handleCalc = () => {
    const distance = distanceCalc(initialCoords, markerPosition);
    console.log(distance);
    onFinish({ distance, initialCoords, markerPosition });
  };

  return (
    <>
      <StreetView location={initialCoords} />
      <MiniMap
        markerPosition={markerPosition}
        setMarkerPosition={setMarkerPosition}
        onCalc={handleCalc}
      />
    </>
  );
}

export default SoloPlayContainer;