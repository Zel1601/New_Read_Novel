import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Css/BlogPage.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog posts from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="blog-loading">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="blog-error">Error: {error}</div>;
  }

  return (
    <div className="blog-page">
      <h1>Blog Posts</h1>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-description">{blog.description}</p>

            {/* Link to the detailed blog page */}
            <Link to={`/blog/${blog.id}`} className="blog-read-more">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
