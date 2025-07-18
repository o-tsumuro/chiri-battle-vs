import { useOutletContext } from 'react-router-dom';
import LogPanel from '../../components/RoomLobby/LogPanel';
import RoomInfo from '../../components/RoomLobby/RoomInfo';
import StartButton from '../../components/RoomLobby/StartButton';
import ReturnHome from '../../components/common/ReturnHome';
import { useRandomLocation } from '../../hooks/useRandomLocation';

const RoomLobby = () => {
  const {
    userName,
    roomId,
    ws,
    opponentUserName,
    isHost,
    logs,
    isReady,
    isOpponentReady,
    setIsReady,
  } = useOutletContext();

  const initPos = isHost ? useRandomLocation() : null;

  const toggleReady = () => {
    setIsReady(prev => {
      const nextReady = !prev;
      ws.current.send(JSON.stringify({
        type: "toggle_ready",
        ready: nextReady,
      }));
      return nextReady;
    });
  };

  const handleStartGame = () => {
    ws.current.send(JSON.stringify({
      type: "start_game",
      initPos: initPos
    }));
  }

  return (
    <>
      <RoomInfo
        roomId={roomId}
        userName={userName}
        opponentUserName={opponentUserName}
        isReady={isReady}
        isOpponentReady={isOpponentReady}
        toggleReady={toggleReady}
      />
      <StartButton
        isHost={isHost}
        canStart={isReady && isOpponentReady}
        onStartGame={handleStartGame}
      />
      <LogPanel logs={logs} />
      <ReturnHome label={"退出する"} />
    </>
  );
};

export default RoomLobby;