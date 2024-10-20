import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AdminCss/EditChapter.css';
import AdminHeader from "./AdminHeader";

const EditChapter = () => {
  const [novels, setNovels] = useState([]);
  const [selectedNovelId, setSelectedNovelId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chapters, setChapters] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchNovels();
  }, []);

  useEffect(() => {
    if (selectedNovelId) {
      fetchChapters(selectedNovelId);
    }
  }, [selectedNovelId]);

  const fetchNovels = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/novels');
      setNovels(response.data);
    } catch (error) {
      console.error('Error fetching novels:', error);
    }
  };

  const fetchChapters = async (novelId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/novels/${novelId}/chapters`);
      setChapters(response.data);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedChapterId || !title || !content) {
      console.error('Missing required fields');
      return;
    }
    try {
      await axios.put(`http://localhost:4000/api/chapters/${selectedNovelId}/${selectedChapterId}`, {
        title,
        content
      });
      // Xử lý thành công
      setSuccessMessage('Chapter updated successfully');
      // Clear form fields
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error updating chapter:', error);
      // Xử lý lỗi
    }
  };

  return (
    <div><AdminHeader />
    <div className="edit-chapter-container">
      <h2>Edit Chapter</h2>
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
      {selectedNovelId && (
        <div className="select-chapter">
          <label>Select Chapter:</label>
          <select value={selectedChapterId} onChange={(e) => setSelectedChapterId(e.target.value)}>
            <option value="">Select chapter</option>
            {chapters.map(chapter => (
              <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
            ))}
          </select>
        </div>
      )}
      {selectedChapterId && (
        <div className="chapter-details">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
      )}
      <button onClick={handleSave}>Save Chapter</button>
    </div>
    </div>
  );
};

export default EditChapter;
