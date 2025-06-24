import { useOutletContext, useLocation } from "react-router-dom";
import { useDistanceCalc } from "../../hooks/useDistanceCalc";
import ResultFooter from "../../components/Battle/ResultFooter";
import ResultMap from "../../components/Battle/ResultMap";

const Result = () => {
  const {
    userName,
    opponentUserName
  } = useOutletContext();

  const location = useLocation();
  const initPos = location.state?.initPos;
  const myPos = location.state?.myPos;
  const opponentPos = location.state?.opponentPos;
  const { distanceCalc } = useDistanceCalc();

  return (
    <>
      <ResultMap
        initPos={initPos}
        myPos={myPos}
        opponentPos={opponentPos}
      />
      <ResultFooter
        userName={userName}
        opponentUserName={opponentUserName}
        myDistance={distanceCalc(initPos, myPos)}
        opponentDistance={distanceCalc(initPos, opponentPos)}
      />
    </>
  );
};

export default Result;