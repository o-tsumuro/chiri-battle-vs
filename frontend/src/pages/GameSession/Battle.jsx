import { useOutletContext } from "react-router-dom";

const Battle = () => {
  const {
    userName,
    opponentUserName,
    roomId
  } = useOutletContext();

  console.log(userName);

  return (
    <>
      <p>
        ルームID：{roomId} / 
        あなたの名前：{userName} / 
        相手の名前：{opponentUserName}
      </p>
    </>
  );
};

export default Battle;