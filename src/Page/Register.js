import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Css/Register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, name }),
      });

      if (response.ok) {
        // Đăng ký thành công, chuyển hướng đến trang đăng nhập
        navigate("/");
      } else {
        // Đăng ký không thành công, xử lý thông báo lỗi
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred while registering");
    }
  };

  return (
    <div className="register-container">
      <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
