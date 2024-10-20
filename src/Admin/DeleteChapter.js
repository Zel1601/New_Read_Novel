import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AdminCss/DeleteChapter.css';
import AdminHeader from "./AdminHeader";

const DeleteChapter = () => {
  const [novels, setNovels] = useState([]);
  const [selectedNovelId, setSelectedNovelId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [chapters, setChapters] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleDelete = async () => {
    if (!selectedChapterId) {
      console.error('No chapter selected for deletion');
      return;
    }
    try {
      await axios.delete(`http://localhost:4000/api/chapters/${selectedNovelId}/${selectedChapterId}`);
      // Xử lý thành công
      setSuccessMessage('Chapter deleted successfully');
      // Clear selectedChapterId
      setSelectedChapterId('');
      // Refetch chapters
      fetchChapters(selectedNovelId);
    } catch (error) {
      console.error('Error deleting chapter:', error);
      setErrorMessage('Error deleting chapter');
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="delete-chapter-container">
        <h2>Delete Chapter</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        <button className="btn_act" onClick={handleDelete}>Delete Chapter</button>
      </div>
    </div>
  );
};

export default DeleteChapter;
