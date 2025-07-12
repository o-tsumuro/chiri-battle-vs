const ResultFooter = ({
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
    </>
  );
};

export default ResultFooter;