import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import './AdminCss/ListNovel.css'; // Import CSS file for styling

const ListNovel = () => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/novels");
        if (!response.ok) {
          throw new Error("Failed to fetch novels");
        }
        const data = await response.json();
        setNovels(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching novels:", error);
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AdminHeader />
      <h2 className="h2_list">Danh Sách Tiểu Thuyết</h2>
      <div className="novel-container">
        {novels.map((novel) => (
          <div key={novel.id} className="novel-item">
            <Link style={{ color: "black", textDecoration: "none" }} to={`/novel/${novel.id}`}>
              <div className="novel-thumbnail">
                <img src={novel.image} alt={novel.title} />
              </div>
              <div className="novel-details">
                <h3>{novel.title}</h3>
                <p>Tác giả: {novel.author}</p>
                <p>Quốc gia: {novel.nation}</p>
                <p>Mô tả: {novel.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListNovel;
