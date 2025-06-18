import { useState, useRef } from 'react';
import { useDistanceCalc } from '../../hooks/useDistanceCalc.js';
import { useRandomLocation } from '../../hooks/useRandomLocation.js';
import StreetView from './StreetView.jsx';

const BattleContainer = ({ initPos }) => {
  const [myPos, setMyPos] = useState(null);
  const opponentPosRef = useRef(null);
  const { distanceCalc } = useDistanceCalc();

  // const handleCalc = () => {
  //   const myDist = distanceCalc(initPos, myPos);
  //   const opponentDist = distanceCalc(initPos, opponentPosRef);
  //   onFinish({ myDist, opponentDist, initPos, myPos, opponentPosRef });
  // };

  return (
    <>
      <StreetView initPos={initPos} />
    </>
  );
};

export default BattleContainer;