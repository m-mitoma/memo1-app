import React from 'react';

type MemoFilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

const MemoFilter: React.FC<MemoFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="memo-filter">
      <input
        type="text"
        placeholder="タイトルで検索..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
      />
    </div>
  );
};

export default MemoFilter;
