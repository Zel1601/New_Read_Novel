import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import './AdminCss/AddNovel.css'; 

const AddNovel = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: null,
    description: "",
    nation: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/novels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add novel');
      }
      const data = await response.json();
      setSuccessMessage('Novel added successfully'); // Set success message
      console.log('Novel added successfully:', data);
    } catch (error) {
      console.error('Error adding novel:', error);
      setSuccessMessage(""); // Clear success message if there is an error
    }
  };

  return (
    <div>
      <AdminHeader />
      <h1>Thêm Tiểu Thuyết</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleChange} required accept="image/*" />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Nation:</label>
          <input type="text" name="nation" value={formData.nation} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <select name="category_id" value={formData.category_id} onChange={handleChange} required>
            <option value="">-- Select Category --</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Novel</button>
      </form>
      {successMessage && <div>{successMessage}</div>} {/* Render success message */}
    </div>
  );
};

export default AddNovel;
