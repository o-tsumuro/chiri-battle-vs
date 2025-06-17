const StartButton = ({ isHost, canStart, onStartGame }) => {

  return (
    <div>
      <br />
      {isHost ? (
        canStart ? (
              <button
                style={{
                  backgroundColor: "orange",
                }}
                onClick={() => onStartGame()}
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