import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Css/SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const { novels } = location.state || { novels: [] };

  return (
    <div className="search-results">
      <h1>Kết quả tìm kiếm</h1>
      {novels.length > 0 ? (
        <ul>
          {novels.map((novel) => (
            <li key={novel.id}>
              <Link to={`/novel/${novel.id}`}>{novel.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không tìm thấy tiểu thuyết nào.</p>
      )}
    </div>
  );
};

export default SearchResults;
