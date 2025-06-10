
const RoomInfo = ({ roomId, userName, opponentUserName }) => {
  return (
    <>
      <h2>ルームID: {roomId}</h2>
      <div>
        {userName}(あなた)
        {opponentUserName && `${opponentUserName}(相手)` }
      </div>
    </>
  );
};

export default RoomInfo