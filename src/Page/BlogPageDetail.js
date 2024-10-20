// BlogPageDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Css/BlogPageDetail.css";

const BlogPageDetail = ({ user }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Không thể tải bài viết");
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        setError("Không thể tải bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/posts/${id}/comments`);
        if (!response.ok) {
          throw new Error("Không thể tải bình luận");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setCommentError("Không thể tải bình luận.");
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setCommentError("Bình luận không được để trống.");
      return;
    }

    if (!user) { // Kiểm tra trạng thái người dùng
      setCommentError("Bạn cần đăng nhập để bình luận.");
      return;
    }

    const userId = user.id; // Lấy userId từ state user

    try {
      const response = await fetch(`http://localhost:4000/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, content: newComment }),
      });

      if (!response.ok) {
        throw new Error("Không thể gửi bình luận");
      }

      const addedComment = await response.json();
      setComments((prevComments) => [...prevComments, addedComment]); // Thêm bình luận mới vào danh sách
      setNewComment("");
      setCommentError("");
    } catch (error) {
      setCommentError("Không thể gửi bình luận. Vui lòng thử lại sau.");
    }
  };

  if (loading) {
    return <div className="blog-detail-loading">Đang tải bài viết...</div>;
  }

  if (error) {
    return <div className="blog-detail-error">Lỗi: {error}</div>;
  }

  if (!blog) {
    return <div className="blog-detail-no-data">Không tìm thấy bài viết</div>;
  }

  return (
    <div className="blog-detail-page">
      <h1 className="blog-detail-title">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="blog-detail-image" />
      <div className="blog-detail-content">
        <p>{blog.content}</p>
        <p>Tác giả: {blog.user_id}</p>
        <p>Ngày đăng: {new Date(blog.created_at).toLocaleDateString()}</p>
      </div>

      <div className="comments-section">
        <h2>Bình luận</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <small>Ngày: {new Date(comment.created_at).toLocaleDateString()}</small>
            </div>
          ))
        ) : (
          <p>Chưa có bình luận nào</p>
        )}

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết bình luận..."
          />
          <button type="submit">Gửi bình luận</button>
        </form>
        {commentError && <div className="comment-error">{commentError}</div>}
      </div>
    </div>
  );
};

export default BlogPageDetail;
