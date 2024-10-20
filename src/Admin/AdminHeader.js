import React from "react";
import './AdminCss/AdminHeader.css';
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xử lý logic đăng xuất ở đây
    // Chẳng hạn, xóa thông tin đăng nhập khỏi localStorage hoặc state
    navigate('/main'); // Chuyển hướng về trang chủ
  };

  return (
    <div className="admin-header">
      <div className="admin-header-left">
        <ul>
          <li>
            <Link to="/admindashboard">
              <img className="img_hd" src={require('../Component/image/Logo.jpg')} alt="Logo" />
            </Link>
          </li>
          <li className="dropdown">
            <button className="dropbtn">Danh sách tiểu thuyết</button>
            <div className="dropdown-content">
              <Link to='/list'>Xem danh sách</Link>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">Thể Loại</button>
            <div className="dropdown-content">
              <Link to='/addcategory'>Thêm thể loại</Link>
              <Link to='/editcategory'>Sửa thể loại</Link>
              <Link to='/deletecategory'>Xóa thể loại</Link>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">Tiểu Thuyết</button>
            <div className="dropdown-content">
              <Link to='/addnovel'>Thêm tiểu thuyết</Link>
              <Link to='/editnovel'>Sửa tiểu thuyết</Link>
              <Link to='/deletenovel'>Xóa tiểu thuyết</Link>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">Chương Tiểu Thuyết</button>
            <div className="dropdown-content">
              <Link to='/addchapter'>Thêm chương</Link>
              <Link to='/editchapter'>Sửa chương</Link>
              <Link to='/deletechapter'>Xóa chương</Link>
            </div>
          </li>
          {/* Thêm nút Duyệt Truyện */}
          <li>
            <Link to="/managenovel">
              <button className="dropbtn">Duyệt Truyện</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="admin-header-right">
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>
    </div>
  );
};

export default AdminHeader;
