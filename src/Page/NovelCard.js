import React from "react";
import { Link } from "react-router-dom";

const NovelCard = ({ novel }) => {
  return (
    <div className="novel-card">
      <Link style={{ color: "black", textDecoration: "none" }} to={`/novel/${novel.id}`}>
        <img src={novel.image} alt={novel.title} />
        <h3>{novel.title}</h3>
        <p>
          <strong>Tác Giả:</strong> {novel.author}
        </p>
        <p>
          <strong>Mô Tả:</strong> {novel.description}
        </p>
        <p>
          <strong>Quốc Gia:</strong> {novel.nation}
        </p>
        <div className="chapters">
          <h4>Chương:</h4>
          <ul>
            {novel.chapters.map((chapter) => (
              <li key={chapter.id}>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/novel/${novel.id}/chapter/${chapter.id}`}
                >
                  {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default NovelCard;
