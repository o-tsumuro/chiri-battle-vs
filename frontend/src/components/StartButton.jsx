
const StartButton = ({ isHost, canStart }) => {
  return (
    <button
      disabled={! (isHost && canStart)}
    >
      {isHost ? (
        canStart ? (
          "GameStart!!"
        ) : (
          "準備中..."
        )
      ) : (
        canStart ? (
          "ホストの開始を待っています。"
        ) : (
          "準備中..."
        )
      )}
    </button>
  );
};

export default StartButton;