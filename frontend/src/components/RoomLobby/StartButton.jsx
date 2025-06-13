
const StartButton = ({ isHost, canStart }) => {
  console.log(canStart);
  return (
    <div>
      <br />
      {isHost ? (
        canStart ? (
              <button
                disabled={! (isHost && canStart)}
                style={{
                  backgroundColor: isHost && canStart ? "orange" : "lightgray",
                }}
              >
                ゲームを開始する
              </button>
        ) : (
          "相手の準備を待機中..."
        )
      ) : (
        canStart ? (
          "ホストの開始を待っています。"
        ) : (
          "相手の準備を待機中..."
        )
      )}
    </div>
  );
};

export default StartButton;