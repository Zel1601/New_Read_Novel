import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/PostNovel.css';

const PostNovel = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [nation, setNation] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Lấy danh sách thể loại từ database
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/categories'); // Đường dẫn API lấy thể loại
        setCategories(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách thể loại:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:4000/api/pending-novels', {
        title,
        author,
        description,
        image,
        nation,
        category_id: categoryId, // Gửi ID thể loại
      });
      alert('Truyện đã được gửi và đang chờ duyệt!');
      // Reset các trường
      setTitle('');
      setAuthor('');
      setDescription('');
      setImage('');
      setNation('');
      setCategoryId('');
    } catch (error) {
      console.error('Lỗi khi gửi truyện:', error);
      alert('Đã xảy ra lỗi khi gửi truyện.');
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
      <h1>Đăng Truyện Mới</h1>
      <input
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tác giả"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Hình ảnh (URL)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Quốc gia"
        value={nation}
        onChange={(e) => setNation(e.target.value)}
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="">Chọn thể loại</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">Gửi Truyện</button>
    </form>
  );
};

export default PostNovel;
