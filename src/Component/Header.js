  import React, { useState, useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { Dropdown } from 'react-bootstrap';
  import { FaUser } from 'react-icons/fa';
  import './Css/Header.css';

  const Header = ({ user, setUser }) => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/categories");
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách thể loại:", error);
        }
      };

      fetchCategories();
    }, []);

    const handleSearch = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch(`http://localhost:4000/api/search?query=${searchTerm}`);
        const data = await response.json();
        if (response.ok) {
          navigate(`/search-results`, { state: { novels: data } });
        } else {
          alert('Không tìm thấy tiểu thuyết nào');
        }
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        alert('Đã xảy ra lỗi khi tìm kiếm');
      }
    };
    
    

    const handleCategoryClick = (categoryId) => {
      navigate(`/category/${categoryId}`);
    };

    const handleLogout = () => {
      setUser(null);
      navigate("/");
    };

    const handleTopUp = () => {
      navigate("/coin");
    };

    const handleUsers = () => {
      navigate("/profile");
    };

    const handlePostStory = () => {
      navigate("/post-story");
    };

    return (
      <header>
        <ul className="header-menu">
          <li className="logo-container">
            <Link to="/main">
              <img src={require('./image/Logo.jpg')} alt="Logo" />
            </Link>
          </li>
          <li className="menu-container">
            <ul className="menu-container">
              <li className="item">
                <Link to="/main" style={{ color: 'black', textDecoration: 'none' }}>Trang chủ</Link>
              </li>
              <li className="item">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-features">
                    Tính năng
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/AllNovel">Tiểu thuyết</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/blogpage">Bài viết</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/updates">Cập nhật</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="item">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Danh mục
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categories.map((category) => (
                      <Dropdown.Item key={category.id} onClick={() => handleCategoryClick(category.id)}>
                        {category.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="item search-bar">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm..."
                  />
                  <button type="submit">🔍</button>
                </form>
              </li>
              <li className="item">
                {user ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Xin chào {user.name} ({user.coin} coin)
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleUsers}>Thông tin cá nhân</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                      <Dropdown.Item onClick={handleTopUp}>Nạp tiền</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>Đăng nhập/Đăng ký</Link>
                )}
              </li>
              <li className="item">
                <Link to="/adminlogin" style={{ color: 'black', textDecoration: 'none' }}>
                  <FaUser /> {/* Icon hình người thay cho chữ Admin */}
                </Link>
              </li>
              <li className="item post-story">
                <Link to="/postnovelmain"><button onClick={handlePostStory}>Đăng truyện</button></Link>
              </li>
            </ul>
          </li>
        </ul>
      </header>
    );
  };

  export default Header;
