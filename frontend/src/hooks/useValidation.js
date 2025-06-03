const useValidation = () => {
  const errorMessages = {
    invalid_username: 'ユーザー名が不正です（20文字以下）',
    username_taken: 'このユーザー名はすでに使われています',
    invalid_room_id: 'ルームIDは半角英数字で4〜20文字にしてください',
    room_full: 'このルームは満員です',
  };

  const validateUser = async (userName, roomId) => {
    if (!roomId || !userName) {
      return 'ユーザー名とルームIDの両方を入力してください';
    }
    try {
      const res = await fetch("http://localhost:8000/validate-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: userName, room_id: roomId }),
      });

      const data = await res.json();

      if (!res.ok) {
        return errorMessages[data.error] || "不明なエラーです";
      }

      return null;
    } catch (err) {
      console.error(err);
      return "通信エラーが発生しました";
    }
  };

  return { validateUser };
};

export default useValidation;