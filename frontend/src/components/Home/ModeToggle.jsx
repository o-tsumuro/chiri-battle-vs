
const ModeToggle = ({ gameState, onChangeMode }) => {
  return (
    <>
      <button disabled={gameState === 'solo'} onClick={() => onChangeMode('solo')}>1人プレイ</button>
      <button disabled={gameState === 'battle'} onClick={() => onChangeMode('battle')}>1対1</button>
    </>
  );
}

export default ModeToggle;