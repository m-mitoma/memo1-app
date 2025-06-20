import { useEffect, useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import MemoForm from './components/MemoForm';
import MemoList from './components/MemoList';
import MemoFilter from './components/MemoFilter';
import { Memo } from './types';
import './App.css';

type SortField = 'id' | 'title' | 'date';
type SortOrder = 'asc' | 'desc';

const App = () => {
  const [memos, setMemos] = useState<Memo[]>(() => {
    const savedMemos = localStorage.getItem('memos');
    return savedMemos ? JSON.parse(savedMemos) : [];
  });

  const [filter, setFilter] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  const addMemo = (newMemoData: Omit<Memo, 'id' | 'date'>) => {
    const newMemo: Memo = {
      id: (memos.length > 0
        ? Math.max(...memos.map((memo) => parseInt(memo.id, 10))) + 1
        : 1
      ).toString(),
      title: newMemoData.title,
      content: newMemoData.content,
      date: new Date().toISOString().split('T')[0],
    };
    setMemos((prevMemos) => [...prevMemos, newMemo]);
  };

  const clearMemos = () => {
    if (window.confirm('全てのメモを削除してもよろしいですか？')) {
      setMemos([]);
      setCurrentPage(0);
    }
  };

  const filteredAndSortedMemos = useMemo(() => {
    const lowerCaseFilter = (filter || '').toLowerCase();
    const filtered = memos.filter(
      (memo) =>
        memo.title.toLowerCase().includes(lowerCaseFilter) ||
        memo.content.toLowerCase().includes(lowerCaseFilter),
    );
    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortField === 'date') {
        const dateA = new Date(aValue as string).getTime();
        const dateB = new Date(bValue as string).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortField === 'id') {
        const idA = parseInt(aValue as string, 10);
        const idB = parseInt(bValue as string, 10);
        return sortOrder === 'asc' ? idA - idB : idB - idA;
      } else {
        const compareResult = (aValue as string).localeCompare(
          bValue as string,
        );
        return sortOrder === 'asc' ? compareResult : -compareResult;
      }
    });
    return sorted;
  }, [filter, sortField, sortOrder, memos]);

  const currentMemos = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return filteredAndSortedMemos.slice(offset, offset + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredAndSortedMemos]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredAndSortedMemos.length / itemsPerPage);
  }, [filteredAndSortedMemos.length, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="app-container">
      <h1>簡易メモアプリ</h1>
      <h2>ローカルストレージ版</h2>
      <MemoForm addMemo={addMemo} />
      <MemoFilter filter={filter} setFilter={setFilter} />
      <div className="sort-buttons">
        <button
          onClick={() => {
            setSortField('id');
            setSortOrder('asc');
          }}
        >
          ID (昇順)
        </button>
        <button
          onClick={() => {
            setSortField('id');
            setSortOrder('desc');
          }}
        >
          ID (降順)
        </button>
        <button
          onClick={() => {
            setSortField('title');
            setSortOrder('asc');
          }}
        >
          タイトル (昇順)
        </button>
        <button
          onClick={() => {
            setSortField('title');
            setSortOrder('desc');
          }}
        >
          タイトル (降順)
        </button>
        <button
          onClick={() => {
            setSortField('date');
            setSortOrder('asc');
          }}
        >
          日付 (昇順)
        </button>
        <button
          onClick={() => {
            setSortField('date');
            setSortOrder('desc');
          }}
        >
          日付 (降順)
        </button>
      </div>
      <hr />
      {/* メモリストを表示 */}
      <MemoList memos={currentMemos} />
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={'前へ'}
          nextLabel={'次へ'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          initialPage={currentPage}
          forcePage={currentPage}
          renderOnZeroPageCount={null}
        />
      )}
      ;
      {memos.length > 0 && (
        <button onClick={clearMemos} className="clear-memos-button">
          全てのメモを削除
        </button>
      )}
      ;
    </div>
  );
};
export default App;
