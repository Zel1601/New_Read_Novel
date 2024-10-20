import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Css/Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the list of blog posts from the API
    fetch("http://localhost:4000/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  return (
    <div className="blog-container">
      <h1>Blog</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="blog-post" key={post.id}>
            <h2>{post.title}</h2>
            <img src={post.image} alt={post.title} />
            <p>{post.content}</p>
            <p>Người viết: {post.user_id}</p>
            <p>Ngày đăng: {new Date(post.created_at).toLocaleDateString()}</p>

            {/* Link to the detailed blog post page */}
            <Link to={`/blog/${post.id}`} className="read-more-link">
              Đọc thêm
            </Link>
          </div>
        ))
      ) : (
        <p>Chưa có bài viết nào.</p>
      )}
    </div>
  );
};

export default Blog;
