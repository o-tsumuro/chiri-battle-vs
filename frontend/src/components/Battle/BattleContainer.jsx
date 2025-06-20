import { useState } from 'react';
import { useDistanceCalc } from '../../hooks/useDistanceCalc.js';
import StreetView from './StreetView.jsx';
import MiniMap from './MiniMap.jsx';

const BattleContainer = ({ initPos, ws }) => {
  const [myPos, setMyPos] = useState(null);

  const confirmPosition = () => {
    ws.current.send(JSON.stringify({
      type: "confirm_position",
      position: myPos,
    }));
  };

  return (
    <>
      <StreetView initPos={initPos} />
      <MiniMap
        markerPosition={myPos}
        setMarkerPosition={setMyPos}
        confirmPosition={confirmPosition}
      />
    </>
  );
};

export default BattleContainer;