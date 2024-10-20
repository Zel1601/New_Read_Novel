import React from "react";

const NovelsByCategory = ({ novels }) => {
  return (
    <div>
      <h2>Danh sách tiểu thuyết</h2>
      <ul>
        {novels.map((novel) => (
          <li key={novel.id}>
            <span>{novel.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NovelsByCategory;
