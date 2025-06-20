import { useState } from 'react';
import type { FormEvent } from 'react';
import { Memo } from '../types';

interface MemoFormProps {
  addMemo: (memo: Omit<Memo, 'id' | 'date'>) => void;
}
const MemoForm = ({ addMemo }: MemoFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      alert('タイトルと内容を入力してください。');
      return;
    }
    addMemo({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="memo-form">
      <input
        type="text"
        placeholder="メモを追加"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="memo-input"
      />
      <textarea
        placeholder="メモの内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="memo-textarea"
      />
      <button type="submit" className="add-memo-button">
        メモを追加
      </button>
    </form>
  );
};

export default MemoForm;
