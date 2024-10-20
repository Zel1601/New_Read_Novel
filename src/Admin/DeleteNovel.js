import React, { useState, useEffect } from "react";
import axios from 'axios';
import AdminHeader from "./AdminHeader";
import './AdminCss/DeleteNovel.css';

const DeleteNovel = () => {
  const [selectedNovelId, setSelectedNovelId] = useState('');
  const [novels, setNovels] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchNovels();
  }, []);

  const fetchNovels = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/novels');
      setNovels(response.data);
    } catch (error) {
      console.error('Error fetching novels:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedNovelId) {
      console.error('No novel selected');
      return;
    }
    try {
      await axios.delete(`http://localhost:4000/api/novels/${selectedNovelId}`);
      // Xử lý xóa thành công
      setSuccessMessage('Novel deleted successfully');
      // Sau một khoảng thời gian, xóa thông báo thành công
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting novel:', error);
      // Xử lý lỗi
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="delete-novel-container">
        <h2 className="delete-novel-title">Delete Novel</h2>
        <div className="select-novel">
          <label className="select-novel-label">Novel:</label>
          <select className="select-novel-dropdown" value={selectedNovelId} onChange={(e) => setSelectedNovelId(e.target.value)}>
            <option value="">Select novel</option>
            {novels.map(novel => (
              <option key={novel.id} value={novel.id}>{novel.title}</option>
            ))}
          </select>
        </div>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default DeleteNovel;
