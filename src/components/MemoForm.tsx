import { useState } from "react";
import type { FormEvent } from "react";

interface MemoFormProps {
  addMemo: (memoText: string) => void;
}
const MemoForm = ({ addMemo }: MemoFormProps) => {
  const [memo, setMemo] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (memo.trim() === "") return;
    addMemo(memo);
    setMemo("");
  };

  return (
    <form onSubmit={handleSubmit} className="memo-form">
      <input
        type="text"
        placeholder="メモを追加"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <button type="submit">メモを追加</button>
    </form>
  );
};

export default MemoForm;
