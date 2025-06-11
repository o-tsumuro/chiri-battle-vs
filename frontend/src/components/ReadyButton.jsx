
const ReadyButton = ({ isReady, opponentUserName, toggleReady }) => {
  console.log("opponentUserName:", opponentUserName);
  return (
    <button
      onClick={() => toggleReady()}
      style={{
        backgroundColor: isReady ? "lightgreen" : "lightgray",
      }}
      disabled={!opponentUserName}
    >
      {isReady ? "準備ok!" : "準備中..."}
    </button>
  );
};

export default ReadyButton