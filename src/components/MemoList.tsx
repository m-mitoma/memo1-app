interface MemoListProps {
  memos: string[];
}
const MemoList = ({ memos }: MemoListProps) => {
  return (
    <ul className="memo-list">
      {memos.map((memo, index) => {
        const isLastItem: boolean = index === memos.length - 1;
        const isSingleItem: boolean = memos.length === 1;
        const baseClassName: string = "memo-item";
        const liClassName: string = `
          ${baseClassName}
          ${isSingleItem ? "single-item" : ""}
          ${isLastItem ? "last-item" : ""}`.trim();
        return (
          <li key={index} className={liClassName}>
            {memo}
          </li>
        );
      })}
    </ul>
  );
};
export default MemoList;
