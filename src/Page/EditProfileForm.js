import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Css/EditProfilePage.css';

const EditProfileForm = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    password:'',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${user.id}`);
      const data = await response.json();
      setFormData({
        name: data.name,
        phone: data.phone || '',
        email: data.email || '',
        address: data.address || '',
        password : data.password || ''
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin cá nhân:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:4000/api/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: formData.name, // Truyền trường "name" vào "username"
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            password: formData.password
          })
        });
    
        if (response.ok) {
          alert('Cập nhật thông tin thành công');
          navigate('/profile');
        } else {
          alert('Cập nhật thông tin thất bại');
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật thông tin cá nhân:', error);
      }
    };
    

  return (
    <div className="edit-profile-form">
      <h2>Chỉnh sửa thông tin cá nhân</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tên người dùng:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Số điện thoại:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Địa chỉ:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          Mật khẩu:
          <input type="text" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button  type="submit">Lưu</button>
      </form>
    </div>
  );
};

export default EditProfileForm;
