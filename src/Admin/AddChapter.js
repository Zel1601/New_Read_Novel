import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AdminCss/AddChapter.css';
import AdminHeader from "./AdminHeader";

const AddChapter = () => {
  const [novels, setNovels] = useState([]);
  const [selectedNovelId, setSelectedNovelId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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

  const handleSave = async () => {
    if (!selectedNovelId || !title || !content) {
      console.error('Missing required fields');
      return;
    }
    try {
      await axios.post(`http://localhost:4000/api/novels/${selectedNovelId}/chapters`, {
        title,
        content
      });
      // Xử lý thành công
      setSuccessMessage('Chapter added successfully');
      // Clear form fields
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding chapter:', error);
      // Xử lý lỗi
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="add-chapter-container">
        <h2>Add Chapter</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="select-novel">
          <label>Select Novel:</label>
          <select value={selectedNovelId} onChange={(e) => setSelectedNovelId(e.target.value)}>
            <option value="">Select novel</option>
            {novels.map(novel => (
              <option key={novel.id} value={novel.id}>{novel.title}</option>
            ))}
          </select>
        </div>
        <div className="chapter-details">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button className='btn_act' onClick={handleSave}>Save Chapter</button>
      </div>
    </div>
  );
};

export default AddChapter;
