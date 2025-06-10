
const ReadyButton = ({ isReady, isOpponentReady, toggleReady }) => {
  return (
    <button
      onClick={() => toggleReady('self')}
      style={{
        backgroundColor: isReady ? "lightgreen" : "lightgray",
      }}
    >
      {isReady ? "準備ok!" : "準備中..."}
    </button>
  );
};

export default ReadyButton