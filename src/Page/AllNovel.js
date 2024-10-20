import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Css/Novel.css";

const AllNovel = () => {
  const [novels, setNovels] = useState([]);
  const [chapters, setChapters] = useState({});
  const [categories, setCategories] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const novelsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch novels
        const novelsResponse = await fetch("http://localhost:4000/api/novels");
        const novelsData = await novelsResponse.json();
        setNovels(novelsData);

        // Fetch chapters for each novel
        const chaptersData = {};
        await Promise.all(
          novelsData.map(async (novel) => {
            const chapterResponse = await fetch(`http://localhost:4000/api/chapters/${novel.id}`);
            const chapterData = await chapterResponse.json();
            chaptersData[novel.id] = chapterData;
          })
        );
        setChapters(chaptersData);

        // Fetch categories
        const categoriesResponse = await fetch("http://localhost:4000/api/categories");
        const categoriesData = await categoriesResponse.json();
        const categoriesMap = {};
        categoriesData.forEach((category) => {
          categoriesMap[category.id] = category.name;
        });
        setCategories(categoriesMap);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastNovel = currentPage * novelsPerPage;
  const indexOfFirstNovel = indexOfLastNovel - novelsPerPage;
  const currentNovels = novels.slice(indexOfFirstNovel, indexOfLastNovel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Danh Sách Tiểu Thuyết</h1>
      <div className="novel-container">
        {currentNovels.map((novel) => (
          <div className="novel-item" key={novel.id}>
            <Link style={{ color: "black", textDecoration: "none" }} to={`/novel/${novel.id}`}>
              <img src={novel.image} alt={novel.title} />
              <h4 style={{ fontStyle: "oblique" }}>{novel.title}</h4>
            </Link>
            <p  style={{ fontStyle: "italic" }}>
              Tác giả: {novel.author}
            </p>
            <p >Mô tả: {novel.description}</p>
            <p style={{fontWeight:"bold"}}>Quốc gia: {novel.nation}</p>
            <p style={{fontWeight:"bold"}}>Thể loại: {categories[novel.category_id]}</p>
            {/* Thêm các thông tin khác cần hiển thị */}
            <div className="chapters">
              <h5 style={{fontWeight:"bold", color:"red"}}>Chương:</h5>
              <ul>
                {/* Render chapters for this novel */}
                {chapters[novel.id] &&
                  chapters[novel.id].map((chapter) => (
                    <li key={chapter.id}>
                      {/* Link to each chapter */}
                      <Link style={{ color: "black", textDecoration: "none" }} to={`/novel/${novel.id}/chapter/${chapter.id}`}>{chapter.title}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className="btn_pa" onClick={() => paginate(currentPage - 1)}>Previous</button>
        <button className="btn_pa"  onClick={() => paginate(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AllNovel;
