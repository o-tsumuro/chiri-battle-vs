import { Link } from 'react-router-dom';

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
      <Link to="/">ホーム画面に戻る</Link>
    </>
  );
}

export default ResultFooter;