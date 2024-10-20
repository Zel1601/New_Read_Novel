import React from "react";
import "./Css/Footer.css";
import logo from "./image/Logo.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <img className="img" src={logo} alt="Logo" />
      </div>
      <div className="info-section">
        <div className="info-details">
          <h2 className="h">Thông tin</h2>
          <p>Họ Tên : Nguyễn Phát Tài</p>
          <p>Website: Đọc Tiểu Thuyết Read Novel</p>
          <p>Sđt : 0797773937</p>
          <p style={{color:"green"}}>Email : mn510678@gmail.com</p>
        </div>
      </div>
      <div className="function-section">
        <h2 className="h">Tương Tác</h2>
        <ul>
          <li>
            <a href="#">Liên hệ</a>
          </li>
          <li>
            <a href="#">Trợ giúp</a>
          </li>
          <li>
            <a href="#">Bản quyền</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
