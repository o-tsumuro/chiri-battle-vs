import { useOutletContext, useLocation } from "react-router-dom";
import RoomInfo from "../../components/Battle/RoomInfo";
import BattleContainer from "../../components/Battle/BattleContainer";

const Battle = () => {
  const {
    roomId,
    userName,
    opponentUserName
  } = useOutletContext();

  const location = useLocation();
  const initPos = location.state?.initPos;

  return (
    <>
      <RoomInfo
        roomId={roomId}
        userName={userName}
        opponentUserName={opponentUserName}
      />
      <BattleContainer initPos={initPos} />
    </>
  );
};

export default Battle;