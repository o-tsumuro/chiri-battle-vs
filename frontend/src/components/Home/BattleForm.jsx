import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useValidation from '../../hooks/useValidation';
import ErrorMessage from './ErrorMessage';

const BattleForm = ({ resetErrorTrigger }) => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { validateUser } = useValidation();

  useEffect(() => {
    setError('');
  }, [resetErrorTrigger]);

  const handleBattleClick = async () => {
    const validationError = await validateUser(userName, roomId);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    navigate('/battle', { state: { userName, roomId } });
  };

  return (
    <>
      <h2>1対1</h2>
      <ErrorMessage message={error} />
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder='名前'
      />
      <br />
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder='ルームID(4~20文字の半角英数字)'
      />
      <br />
      <button onClick={handleBattleClick}>ルーム作成/入室</button>
    </>
  );
}

export default BattleForm;