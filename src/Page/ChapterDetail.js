import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Css/ChapterDetail.css';

const ChapterDetail = () => {
  const { id, chapterId } = useParams(); 
  const [chapter, setChapter] = useState(null);
  const [novelTitle, setNovelTitle] = useState('');

  useEffect(() => {
    const fetchChapterDetail = async () => {
      try {
        const [chapterResponse, novelResponse] = await Promise.all([
          fetch(`http://localhost:4000/api/chapters/${id}/${chapterId}`),
          fetch(`http://localhost:4000/api/novels/${id}`)
        ]);

        if (!chapterResponse.ok || !novelResponse.ok) {
          throw new Error('Không thể tìm thấy chương hoặc tiểu thuyết');
        }

        const [chapterData, novelData] = await Promise.all([chapterResponse.json(), novelResponse.json()]);
        setChapter(chapterData);
        setNovelTitle(novelData.title);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết chương hoặc tiểu thuyết:', error);
      }
    };

    fetchChapterDetail();
  }, [id, chapterId]);

  if (!chapter) {
    return <div>Đang tải...</div>;
  }

  const fullTitle = `${novelTitle} - ${chapter.title}`;

  return (
    <div className="container_chapter">
      <h3 className="chapter_title">{fullTitle}</h3>
      <p className="chapter_content">{chapter.content}</p>
    </div>
  );
};

export default ChapterDetail;
