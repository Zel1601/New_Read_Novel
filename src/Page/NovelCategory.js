import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NovelCard from "./NovelCard";
import "./Css/CategoryNovelStyle.css";

const NovelCategory = () => {
  const { id } = useParams(); // Lấy id thể loại từ URL
  const [novelsInCategory, setNovelsInCategory] = useState([]);

  useEffect(() => {
    fetchNovelsInCategory(id);
  }, [id]);

  const fetchNovelsInCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/categories/${categoryId}/novels`);
      const data = await response.json();
      const novelsWithChapters = await Promise.all(data.map(async (novel) => {
        const chapterResponse = await fetch(`http://localhost:4000/api/chapters/${novel.id}`);
        const chapters = await chapterResponse.json();
        return { ...novel, chapters };
      }));
      setNovelsInCategory(novelsWithChapters);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tiểu thuyết:", error);
    }
  };

  return (
    <div>
      <h2 className="title_item">Tiểu Thuyết Thể Loại {id}</h2>
      <div className="novel-list">
        {novelsInCategory.map((novel) => (
          <NovelCard key={novel.id} novel={novel} />
        ))}
      </div>
    </div>
  );
};

export default NovelCategory;
