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
    if (savedMemos) {
      const parsedMemos: Memo[] = JSON.parse(savedMemos);
      return parsedMemos.map((memo) => ({
        ...memo,
        id: typeof memo.id === 'string' ? parseInt(memo.id, 10) : memo.id,
      }));
    }
    return [];
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
    const newId =
      memos.length > 0 ? Math.max(...memos.map((memo) => memo.id)) + 1 : 1;
    const newMemo: Memo = {
      id: newId,
      title: newMemoData.title,
      content: newMemoData.content,
      date: new Date().toISOString(),
    };
    setMemos((prevMemos) => [...prevMemos, newMemo]);
  };

  const clearMemos = () => {
    if (window.confirm('全てのメモを削除してもよろしいですか？')) {
      setMemos([]);
      setCurrentPage(0);
    }
  };
  const handleSortClick = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'date' ? 'desc' : 'asc');
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
        return sortOrder === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
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

  const getSortIndicator = (field: SortField) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div className="app-container">
      <h1>簡易メモアプリ</h1>
      <h2>ローカルストレージ版</h2>
      <MemoForm addMemo={addMemo} />
      <MemoFilter filter={filter} setFilter={setFilter} />
      <div className="sort-buttons">
        <button
          onClick={() => handleSortClick('id')}
          className={sortField === 'id' ? 'active-sort' : ''}
        >
          ID{getSortIndicator('id')}
        </button>
        <button
          onClick={() => handleSortClick('title')}
          className={sortField === 'title' ? 'active-sort' : ''}
        >
          タイトル{getSortIndicator('title')}
        </button>
        <button
          onClick={() => handleSortClick('date')}
          className={sortField === 'date' ? 'active-sort' : ''}
        >
          日付{getSortIndicator('date')}
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
