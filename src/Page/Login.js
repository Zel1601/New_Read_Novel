// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Css/Login.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData); // Cập nhật người dùng
        navigate("/main");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Đã xảy ra lỗi trong quá trình đăng nhập.");
    }
  };

  return (
    <div className="login-form">
      <h2>Đăng Nhập</h2>
      {error && <p style={{ color: "red" }} className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên người dùng</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
      <p>
        Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
};

export default Login;
