import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Css/Detail.css';

const NovelDetail = ({ user, setUser }) => {
  const { id } = useParams();
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    const fetchNovelDetail = async () => {
      try {
        const novelResponse = await fetch(`http://localhost:4000/api/novels/${id}`);
        if (!novelResponse.ok) {
          throw new Error('Không thể tìm thấy tiểu thuyết');
        }
        const novelData = await novelResponse.json();
        setNovel(novelData);

        const chaptersResponse = await fetch(`http://localhost:4000/api/novels/${id}/chapters`);
        if (!chaptersResponse.ok) {
          throw new Error('Không thể tìm thấy danh sách chương');
        }
        const chaptersData = await chaptersResponse.json();
        setChapters(chaptersData);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết tiểu thuyết:', error);
      }
    };

    fetchNovelDetail();
  }, [id]);

  const handleDonationChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/novels/${id}/donate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, amount: parseInt(donationAmount) })
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ ...user, coin: data.coin });
        alert('Ủng hộ thành công');
      } else {
        alert(data.error || 'Ủng hộ thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi ủng hộ:', error);
      alert('Đã xảy ra lỗi khi ủng hộ');
    }
  };

  if (!novel) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="detail-container">
      <img className="img_detail" src={novel.image} alt={novel.title} />
      <div className="detail-info">
        <h2 className='detail_title'>Chi Tiết</h2>
        <div>
          <h3>{novel.title}</h3>
          <p><strong>Tác Giả:</strong> {novel.author}</p>
          <p><strong>Mô Tả:</strong> {novel.description}</p>
          <p><strong>Quốc Gia:</strong> {novel.nation}</p>
          <div className="chapters">
            <h4>Chương:</h4>
            <ul>
              {chapters.map(chapter => (
                <li className="li_detail" key={chapter.id}>
                  <Link style={{ color: "black", textDecoration: "none" }} to={`/novel/${novel.id}/chapter/${chapter.id}`}>{chapter.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="donate-coin-form">
            <h4>Ủng Hộ Coin</h4>
            <form onSubmit={handleDonate}>
              <label>
                Số coin muốn ủng hộ:
                <input
                  type="number"
                  value={donationAmount}
                  onChange={handleDonationChange}
                  placeholder="Nhập số coin"
                  required
                />
              </label>
              <button type="submit">Ủng Hộ</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelDetail;
