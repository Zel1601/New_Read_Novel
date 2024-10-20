import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminCss/ManageNovel.css';

const ManageNovel = () => {
  const [pendingNovels, setPendingNovels] = useState([]);

  useEffect(() => {
    const fetchPendingNovels = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/pending-novels');
        setPendingNovels(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tiểu thuyết chờ duyệt:', error);
      }
    };

    fetchPendingNovels();
  }, []);

  const handleApprove = async (novelId) => {
    try {
      const novelResponse = await axios.get(`http://localhost:4000/api/pending-novels/${novelId}`);
      const novel = novelResponse.data;

      // Thêm tiểu thuyết vào bảng approved-novels
      await axios.post('http://localhost:4000/api/approved-novels', {
        title: novel.title,
        author: novel.author,
        image: novel.image,
        description: novel.description,
        nation: novel.nation,
        category_id: novel.category_id,
        user_id: novel.user_id, // Thêm user_id nếu cần
        approved_at: new Date() // Thêm thời gian duyệt
      });

      // Xóa tiểu thuyết khỏi bảng pending-novels
      await axios.delete(`http://localhost:4000/api/pending-novels/${novelId}`);
      
      // Cập nhật danh sách tiểu thuyết chờ duyệt
      setPendingNovels(pendingNovels.filter(n => n.id !== novelId));
      alert('Tiểu thuyết đã được duyệt thành công!');
    } catch (error) {
      console.error('Lỗi khi duyệt tiểu thuyết:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const handleReject = async (novelId) => {
    const reason = prompt('Nhập lý do từ chối:');
    if (!reason) return;

    try {
      await axios.delete(`http://localhost:4000/api/pending-novels/${novelId}`);
      alert('Tiểu thuyết đã bị từ chối với lý do: ' + reason);
      setPendingNovels(pendingNovels.filter(n => n.id !== novelId));
    } catch (error) {
      console.error('Lỗi khi từ chối tiểu thuyết:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div>
    <div className="manage-novel-container">
      <h1>Danh sách tiểu thuyết chờ duyệt</h1>
      {pendingNovels.length === 0 ? (
        <p>Không có tiểu thuyết nào chờ duyệt.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Hình ảnh</th>
              <th>Mô tả</th>
              <th>Quốc gia</th>
              <th>Thể loại</th>
              <th>Tên người dùng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {pendingNovels.map((novel) => (
              <tr key={novel.id}>
                <td>{novel.title}</td>
                <td>{novel.author}</td>
                <td>
                  <img src={novel.image} alt={novel.title} className="novel-image" />
                </td>
                <td>{novel.description}</td>
                <td>{novel.nation}</td>
                <td>{novel.category_id}</td>
                <td>{novel.user_id}</td> {/* Nếu có trường này */}
                <td>
                  <button onClick={() => handleApprove(novel.id)}>Duyệt</button>
                  <button onClick={() => handleReject(novel.id)}>Từ chối</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default ManageNovel;
