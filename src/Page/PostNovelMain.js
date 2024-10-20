import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Css/PostNovelMain.css'; // Thêm file CSS cho component

const PostNovelMain = () => {
  const [pendingNovels, setPendingNovels] = useState([]);
  const [approvedNovels, setApprovedNovels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPendingNovels = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/pending-novels'); // Thay đổi đường dẫn
        setPendingNovels(response.data);
      } catch (error) {
        setErrorMessage('Lỗi khi tải danh sách tác phẩm chờ duyệt.');
        console.error('Lỗi khi tải danh sách tác phẩm chờ duyệt:', error);
      }
    };

    const fetchApprovedNovels = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/approved-novels'); // Đổi đường dẫn
        setApprovedNovels(response.data); // Lưu trực tiếp danh sách đã duyệt
      } catch (error) {
        setErrorMessage('Lỗi khi tải danh sách tác phẩm đã duyệt.');
        console.error('Lỗi khi tải danh sách tác phẩm đã duyệt:', error);
      }
    };

    fetchPendingNovels();
    fetchApprovedNovels();
  }, []);

  return (
    <div className="user-profile-container">
      <h1>Tường cá nhân của bạn</h1>
      
      <div className="button-container">
        <Link to="/postnovel">
          <button className="action-button">Đăng tác phẩm</button>
        </Link>
        <Link to="/rule">
          <button className="action-button">Luật tác giả</button>
        </Link>
      </div>

      <h2>Danh sách tác phẩm:</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="novel-list">
        <div className="novel-section">
          <h3>Tác phẩm chờ duyệt:</h3>
          {pendingNovels.length === 0 ? (
            <p>Không có tác phẩm nào chờ duyệt.</p>
          ) : (
            <ul>
              {pendingNovels.map((novel) => (
                <li key={novel.id} className="novel-item">
                  <h4>{novel.title}</h4>
                  <p>Tác giả: {novel.author}</p>
                  <p>Mô tả: {novel.description}</p>
                  <Link to={`/novel/${novel.id}`}>Xem chi tiết</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="novel-section">
          <h3>Tác phẩm đã duyệt:</h3>
          {approvedNovels.length === 0 ? (
            <p>Không có tác phẩm nào đã duyệt.</p>
          ) : (
            <ul>
              {approvedNovels.map((novel) => (
                <li key={novel.id} className="novel-item">
                  <h4>{novel.title}</h4>
                  <p>Tác giả: {novel.author}</p>
                  <p>Mô tả: {novel.description}</p>
                  <Link to={`/novel/${novel.id}`}>Xem chi tiết</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostNovelMain;
