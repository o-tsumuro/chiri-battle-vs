import { useNavigate } from "react-router-dom";

const StartButton = ({ isHost, canStart, roomId }) => {
  const navigate = useNavigate();

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
                onClick={() => navigate(`/battle/${roomId}`)}
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