import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Css/ProfilePage.css';

const ProfilePage = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [level, setLevel] = useState(0);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    if (user && user.id) {
      fetchUserData(user.id);
      const interval = setInterval(() => {
        increaseXp();
      }, getIntervalTime(level));

      return () => clearInterval(interval);
    }
  }, [user, level]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Lỗi khi lấy thông tin người dùng');
      }
      const data = await response.json();
      setUserData(data);
      setXp(data.xp || 0);
      setLevel(calculateLevel(data.xp || 0));
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  const increaseXp = () => {
    if (level < 4) {
      setXp((prevXp) => {
        const newXp = prevXp + getXpGain(level);
        if (newXp >= 100) {
          setLevel((prevLevel) => Math.min(prevLevel + 1, 5));
          return newXp - 100; 
        }
        return newXp;
      });
    } else if (level === 4) {
      setXp((prevXp) => prevXp + 0.5);
    }
  };

  const getXpGain = (level) => {
    switch (level) {
      case 0: return 10;
      case 1: return 8;
      case 2: return 5;
      case 3: return 1;
      case 4: return 0.5;
      default: return 0;
    }
  };

  const getIntervalTime = (level) => {
    switch (level) {
      case 0:
      case 1: return 5 * 60 * 1000;
      case 2: return 3 * 60 * 1000;
      case 3:
      case 4: return 1 * 60 * 1000;
      default: return 1000;
    }
  };

  const calculateLevel = (xp) => {
    if (xp < 100) return 0;
    if (xp < 200) return 1;
    if (xp < 300) return 2;
    if (xp < 400) return 3;
    if (xp < 500) return 4;
    return 5;
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const levelNames = [
    "Sơ cấp",
    "Người thích truyện",
    "Người ham đọc",
    "Người mê truyện",
    "Bậc thầy tiểu thuyết"
  ];

  return (
    <div className="profile-page">
      <h2>Thông tin cá nhân</h2>
      <p><strong>Tên người dùng:</strong> {userData.name}</p>
      <p><strong>Mật khẩu:</strong> {userData.password}</p>
      <p><strong>Số điện thoại:</strong> {userData.phone || "Chưa cập nhật"}</p>
      <p><strong>Email:</strong> {userData.email || "Chưa cập nhật"}</p>
      <p><strong>Địa chỉ:</strong> {userData.address || "Chưa cập nhật"}</p>
      
      <h3>Cấp độ: {levelNames[level]} (Cấp {level})</h3>
      <p>XP hiện tại: {xp}/{100 + level * 100}</p>
      
      {/* Thanh tiến trình XP */}
      <div className="xp-bar">
        <div 
          className="xp-fill" 
          style={{ width: `${(xp / (100 + level * 100)) * 100}%` }}
        ></div>
      </div>

      <button>
        <Link style={{ color: "black" }} to="/edit">Cập nhật thông tin</Link>
      </button>
    </div>
  );
};

export default ProfilePage;
