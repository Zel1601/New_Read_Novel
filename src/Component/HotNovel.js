import React, { useState, useEffect } from "react";
import "./Css/HotNovel.css";
import { Link } from "react-router-dom";

const HotNovel = () => {
  const [newNovels, setNewNovels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/novels");
        const data = await response.json();
        // Lấy 8 tiểu thuyết đầu tiên từ danh sách tiểu thuyết
        const first8Novels = data.slice(0, 8);
        setNewNovels(first8Novels);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tiểu thuyết:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hot Novels</h1>
      <div className="hot-novels-container">
        {newNovels.map((novel) => (
          <div className="novel-itemm" key={novel.id}>
            <Link style={{color:"black", textDecoration:"none"}} to={`/novel/${novel.id}`}>
              <img src={novel.image} alt={novel.title} />
              <h4>{novel.title}</h4>
            </Link>
            <p >{novel.author}</p>
            <p >{novel.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotNovel;
