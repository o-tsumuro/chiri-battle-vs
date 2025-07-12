import { Link } from 'react-router-dom';
import ReturnHome from '../common/ReturnHome';

const ResultFooter = ({
  roomId,
  userName,
  opponentUserName,
  myDistance,
  opponentDistance
}) => {

  const formatDistance = (distance) => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(1)} km`;
    } else {
      return `${distance} m`;
    }
  };

  return (
    <>
      {opponentDistance >= myDistance ? (
        <h1>
          {userName}の勝利！！
        </h1>
      ) : (
        <h1>
          {opponentUserName}の勝利！！
        </h1>
      )}
      <h2>{`🔵${userName}(あなた)：${formatDistance(myDistance)}`}</h2>
      <h2>{`🔴${opponentUserName}(相手)：${formatDistance(opponentDistance)}`}</h2>
      <Link to={`/battle/${roomId}/lobby`}>もう一度プレイする(ルームに戻る)</Link>
      <ReturnHome label={"終了する"} />
    </>
  );
};

export default ResultFooter;