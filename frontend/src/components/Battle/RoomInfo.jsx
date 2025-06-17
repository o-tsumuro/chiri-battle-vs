
const RoomInfo = ({ roomId, userName, opponentUserName }) => {
  return (
    <p>
      ルームID：{roomId} /
      あなたの名前：{userName} /
      相手の名前：{opponentUserName}
    </p>
  );
};

export default RoomInfo;