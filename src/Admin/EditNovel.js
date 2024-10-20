import React, { useState, useEffect, useRef } from "react";
import './AdminCss/EditNovel.css';
import axios from 'axios';
import AdminHeader from "./AdminHeader";

const EditNovel = () => {
  const [selectedNovelId, setSelectedNovelId] = useState('');
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [novels, setNovels] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [nation, setNation] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const imageInputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNovels();
  }, [selectedNovelId]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchNovels = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/novels');
      setNovels(response.data);
    } catch (error) {
      console.error('Error fetching novels:', error);
    }
  };

  const fetchSelectedNovel = async (novelId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/novels/${novelId}`);
      const novel = response.data;
      setSelectedNovel(novel);
      setTitle(novel.title);
      setAuthor(novel.author);
      setImage(novel.image);
      setDescription(novel.description);
      setNation(novel.nation);
      setCategoryId(novel.category_id);
    } catch (error) {
      console.error('Error fetching selected novel:', error);
    }
  };

  const handleImageChange = () => {
    const file = imageInputRef.current.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
    if (!file.type.startsWith('image/')) {
      console.error('Selected file is not an image');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!selectedNovelId || !title || !author || !image || !description || !nation || !categoryId) {
      console.error('Missing required fields');
      return;
    }
    try {
      await axios.put(`http://localhost:4000/api/novels/${selectedNovelId}`, {
        title,
        author,
        image,
        description,
        nation,
        category_id: categoryId
      });
      // Xử lý thành công
      setSuccessMessage('Novel updated successfully');
      // Sau một khoảng thời gian, xóa thông báo thành công
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating novel:', error);
      // Xử lý lỗi
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="edit-novel">
        <h2>Edit Novel</h2>
        <div>
          <label>Novel:</label>
          <select value={selectedNovelId} onChange={(e) => { setSelectedNovelId(e.target.value); fetchSelectedNovel(e.target.value); }}>
            <option value="">Select novel</option>
            {novels.map(novel => (
              <option key={novel.id} value={novel.id}>{novel.title}</option>
            ))}
          </select>
        </div>
        {!selectedNovel && (
          <p>Please select a novel to edit</p>
        )}
        {selectedNovel && (
          <>
            <div>
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label>Author:</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
              <label>Image:</label>
              <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageChange} />
              {image && <img src={image} alt="Novel cover" />}
            </div>
            <div>
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <label>Nation:</label>
              <input type="text" value={nation} onChange={(e) => setNation(e.target.value)} />
            </div>
            <div>
              <label>Category:</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <button onClick={handleSave}>Save</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default EditNovel;
