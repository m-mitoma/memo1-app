import { useEffect, useState } from "react";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";
import "./App.css";

const App = () => {
  const [memos, setMemos] = useState<string[]>(() => {
    const savedMemos = localStorage.getItem("memos");
    return savedMemos ? JSON.parse(savedMemos) : [];
  });
  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  const addMemo = (memo: string) => {
    setMemos([...memos, memo]);
  };

  const clearMemos = () => {
    setMemos([]);
  };

  return (
    <div className="app-container">
      <h1>簡易メモアプリ</h1>
      <h2>ローカルストレージ版</h2>
      <MemoForm addMemo={addMemo} />
      {memos.length > 0 && <MemoList memos={memos} />}
      {memos.length > 0 && (
        <button onClick={clearMemos} className="clearmemos">
          メモを削除
        </button>
      )}
    </div>
  );
};
export default App;
