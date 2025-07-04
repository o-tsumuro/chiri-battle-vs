import ReturnHome from "../common/ReturnHome";

const ResultFooter = ({ distance, onRetry }) => {

  const formatDistance = (distance) => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(1)} km`;
    } else {
      return `${distance} m`;
    }
  };

  return (
    <>
      <h2>{formatDistance(distance)}</h2>
      <button onClick={onRetry}>もう一度プレイ</button>
      <ReturnHome label={"ホームに戻る"} />
    </>
  );
}

export default ResultFooter;