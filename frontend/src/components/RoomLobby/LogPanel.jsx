import { useRef, useEffect } from 'react';

const LogPanel = ({ logs }) => {
  const logEndRef = useRef(null);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  return (
    <>
      <h3>ログ</h3>
      <div style={{
        border: '1px solid #ccc',
        padding: 10,
        height: 100,
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {logs.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
        <div ref={logEndRef} />
      </div>
    </>
  );
}

export default LogPanel;