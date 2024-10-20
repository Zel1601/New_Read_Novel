import React from 'react';

const NovelList = ({ novels }) => {
  return (
    <div>
      {novels.map(novel => (
        <div key={novel.id}>
          <h3>{novel.title}</h3>
          <p><strong>Tác giả:</strong> {novel.author}</p>
          <p><strong>Mô tả:</strong> {novel.description}</p>
          {/* Thêm các thông tin khác của tiểu thuyết nếu cần */}
        </div>
      ))}
    </div>
  );
};

export default NovelList;
