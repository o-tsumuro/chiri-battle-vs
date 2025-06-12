import ReadyButton from "./ReadyButton";

const RoomInfo = ({
  roomId,
  userName,
  opponentUserName,
  isReady,
  isOpponentReady,
  toggleReady
}) => {
  return (
    <>
      <h2>ルームID: {roomId}</h2>
      <div>
        {`${userName}(あなた)　`}
        <ReadyButton
          isReady={isReady}
          opponentUserName={opponentUserName}
          toggleReady={toggleReady}
        />
        {opponentUserName ? (
          <div>
            ${opponentUserName}(相手)
            <span
              style={{
                color: isOpponentReady ? "green" : "gray"
              }}
            >
              {isOpponentReady ? "　準備ok!" : "　準備中..."}
            </span>
          </div>
        ) : (<div>"相手を待っています"</div>)}
      </div>
    </>
  );
};

export default RoomInfo