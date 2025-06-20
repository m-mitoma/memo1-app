import React from 'react';
import { Memo } from '../types';

type MemoListProps = {
  memos: Memo[];
};
const MemoList: React.FC<MemoListProps> = ({ memos }) => {
  if (memos.length === 0) {
    return <p className="no-memos-message">表示するメモがありません。</p>;
  }
  return (
    <div className="memo-list">
      {memos.map((memo, index) => {
        const isLastItem: boolean = index === memos.length - 1;
        const isSingleItem: boolean = memos.length === 1;
        const baseClassName: string = 'memo-item';
        const liClassName: string = `
          ${baseClassName}
          ${isSingleItem ? 'single-item' : ''}
          ${isLastItem ? 'last-item' : ''}`.trim();
        return (
          <div key={memo.id} className={liClassName}>
            <h3>{memo.title}</h3>
            <p>日付: {memo.date}</p>
            <p>{memo.content}</p>
          </div>
        );
      })}
    </div>
  );
};
export default MemoList;
