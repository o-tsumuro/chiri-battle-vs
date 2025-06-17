import { useOutletContext } from "react-router-dom";
import RoomInfo from "../../components/Battle/RoomInfo";

const Battle = () => {
  const {
    roomId,
    userName,
    opponentUserName
  } = useOutletContext();

  return (
    <>
      <RoomInfo
        roomId={roomId}
        userName={userName}
        opponentUserName={opponentUserName}
      />
    </>
  );
};

export default Battle;