import React from 'react';
import { Memo } from '../types';

type MemoListProps = {
  memos: Memo[];
};
const MemoList: React.FC<MemoListProps> = ({ memos }) => {
  if (memos.length === 0) {
    return <p className="no-memos-message">表示するメモがありません。</p>;
  }
  const padZero = (num: number): string => {
    return num.toString().padStart(2, '0');
  };
  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedHours = padZero(hours);
    const formattedMinutes = padZero(minutes);
    const formattedSeconds = padZero(seconds);
    // フォーマットして結合
    return `${year}年${month}月${day}日 ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
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
            <p>更新日: {formatDateTime(memo.date)}</p>
            <p>{memo.content}</p>
          </div>
        );
      })}
    </div>
  );
};
export default MemoList;
