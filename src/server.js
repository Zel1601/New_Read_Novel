const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


const app = express();
const port = 4000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ReadNovel',
  password: '16012003tai',
  port: 5432,
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());



app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thể loại:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách thể loại' });
  }
});

app.get('/api/novels', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM novels');
    res.json(result.rows);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tiểu thuyết:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách tiểu thuyết' });
  }
});

app.get('/api/chapters/:novelId', async (req, res) => {
  const { novelId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM chapters WHERE novel_id = $1', [novelId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chương:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách chương' });
  }
});

app.get('/api/categories/:categoryId/novels', async (req, res) => {
  const { categoryId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM novels WHERE category_id = $1', [categoryId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tiểu thuyết của thể loại:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách tiểu thuyết của thể loại' });
  }
});

app.get('/api/novels/:novelId', async (req, res) => {
  const { novelId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM novels WHERE id = $1', [novelId]);
    const novel = result.rows[0];
    if (!novel) {
      return res.status(404).json({ error: 'Không tìm thấy tiểu thuyết' });
    }
    res.json(novel);
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết tiểu thuyết:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy chi tiết tiểu thuyết' });
  }
});

app.get('/api/novels/:novelId/chapters', async (req, res) => {
  const { novelId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM chapters WHERE novel_id = $1', [novelId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chương của tiểu thuyết:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách chương của tiểu thuyết' });
  }
});

app.get('/api/chapters/:novelId/:chapterId', async (req, res) => {
  const { novelId, chapterId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM chapters WHERE novel_id = $1 AND id = $2', [novelId, chapterId]);
    const chapter = result.rows[0];
    if (!chapter) {
      throw new Error('Không tìm thấy chương');
    }
    res.json(chapter);
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết chương:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy chi tiết chương' });
  }
});



app.get('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const result = await pool.query('SELECT id, name, username, password, phone, email, address, coin FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }
    res.json(user);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng' });
  }
});


app.put('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, phone, email, address,password } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, phone = $2, email = $3, address = $4 , password = $5 WHERE id = $6 RETURNING *',
      [name, phone, email, address,password, userId]
    );
    const updatedUser = result.rows[0];
    res.json(updatedUser);
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password, name } = req.body;

  try {
    if (!username || !password || !name) {
      return res.status(400).json({ error: "Username, password, and name are required" });
    }

    const result = await pool.query(
      'INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING *',
      [username, password, name]
    );

    const newUser = result.rows[0];
    res.json(newUser);
  } catch (error) {
    console.error("Error registering:", error);
    res.status(500).json({ error: "An error occurred while registering" });
  }
});

app.post('/api/deposit', async (req, res) => {
  const { userId, amount } = req.body;

  try {
    if (!userId || !amount) {
      return res.status(400).json({ error: "User ID and amount are required" });
    }

    const coin = amount / 1000; // Quy đổi 10,000 VND = 10 coin
    const result = await pool.query(
      'UPDATE users SET coin = coin + $1 WHERE id = $2 RETURNING coin',
      [coin, userId]
    );

    const updatedCoin = result.rows[0].coin;
    res.json({ coin: updatedCoin });
  } catch (error) {
    console.error("Error depositing coin:", error);
    res.status(500).json({ error: "An error occurred while depositing coin" });
  }
});

app.post('/api/novels/:novelId/donate', async (req, res) => {
  const { novelId } = req.params;
  const { userId, amount } = req.body;

  try {
    if (!userId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'User ID and a positive amount are required' });
    }

    // Check user coin balance
    const userResult = await pool.query('SELECT coin FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];

    if (!user || user.coin < amount) {
      return res.status(400).json({ error: 'Insufficient coin balance' });
    }

    // Deduct coins from user
    const updatedUserResult = await pool.query('UPDATE users SET coin = coin - $1 WHERE id = $2 RETURNING coin', [amount, userId]);
    const updatedUser = updatedUserResult.rows[0];

    // Insert donation record
    await pool.query('INSERT INTO donations (user_id, novel_id, amount) VALUES ($1, $2, $3)', [userId, novelId, amount]);

    res.json({ success: true, message: 'Donation successful', coin: updatedUser.coin });
  } catch (error) {
    console.error('Error making a donation:', error);
    res.status(500).json({ error: 'An error occurred while making a donation' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});


app.post('/api/admin-login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    const admin = result.rows[0];

    if (!admin) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    if (password !== admin.password) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    res.json(admin);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

app.post('/api/categories', async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Lỗi khi thêm thể loại mới:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm thể loại mới' });
  }
});

// Tuyến đường để sửa đổi thể loại
app.put('/api/categories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  try {
    const result = await pool.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, categoryId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Lỗi khi sửa đổi thể loại:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi sửa đổi thể loại' });
  }
});

// Tuyến đường để xóa thể loại
app.delete('/api/categories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [categoryId]);
    res.json({ message: 'Thể loại đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa thể loại:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa thể loại' });
  }
});

app.post('/api/novels', async (req, res) => {
  const { title, author, image, description, nation, category_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO novels (title, author, image, description, nation, category_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, author, image, description, nation, category_id, 'pending'] // Trạng thái mặc định là pending
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Lỗi khi tạo tiểu thuyết mới:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo tiểu thuyết mới' });
  }
});

app.put('/api/novels/:novelId', async (req, res) => {
  const { novelId } = req.params;
  const { title, author, image, description, nation, category_id } = req.body;

  try {
    // Xác thực yêu cầu của admin ở đây nếu cần thiết

    const result = await pool.query(
      'UPDATE novels SET title = $1, author = $2, image = $3, description = $4, nation = $5, category_id = $6 WHERE id = $7 RETURNING *',
      [title, author, image, description, nation, category_id, novelId]
    );
    const updatedNovel = result.rows[0];
    res.json(updatedNovel);
  } catch (error) {
    console.error('Error updating novel:', error);
    res.status(500).json({ error: 'An error occurred while updating the novel' });
  }
});

app.delete('/api/novels/:novelId', async (req, res) => {
  const { novelId } = req.params;

  try {
    await pool.query('DELETE FROM novels WHERE id = $1', [novelId]);
    res.json({ message: 'Tiểu thuyết đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa tiểu thuyết:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa tiểu thuyết' });
  }
});

app.post('/api/novels/:novelId/chapters', async (req, res) => {
  const { novelId } = req.params;
  const { title, content } = req.body;

  try {
    // Check if the novel exists
    const novelResult = await pool.query('SELECT * FROM novels WHERE id = $1', [novelId]);
    const novel = novelResult.rows[0];
    if (!novel) {
      return res.status(404).json({ error: 'Novel not found' });
    }

    // Insert the new chapter into the database
    const result = await pool.query(
      'INSERT INTO chapters (novel_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [novelId, title, content]
    );
    const newChapter = result.rows[0];
    res.json(newChapter);
  } catch (error) {
    console.error('Error adding chapter:', error);
    res.status(500).json({ error: 'An error occurred while adding chapter' });
  }
});

app.put('/api/chapters/:novelId/:chapterId', async (req, res) => {
  const { novelId, chapterId } = req.params;
  const { title, content } = req.body;

  try {
    // Xác thực yêu cầu ở đây nếu cần thiết

    const result = await pool.query(
      'UPDATE chapters SET title = $1, content = $2 WHERE novel_id = $3 AND id = $4 RETURNING *',
      [title, content, novelId, chapterId]
    );
    const updatedChapter = result.rows[0];
    res.json(updatedChapter);
  } catch (error) {
    console.error('Error updating chapter:', error);
    res.status(500).json({ error: 'An error occurred while updating the chapter' });
  }
});

app.delete('/api/chapters/:novelId/:chapterId', async (req, res) => {
  const { novelId, chapterId } = req.params;

  try {
    // Xóa chương từ cơ sở dữ liệu
    await pool.query('DELETE FROM chapters WHERE novel_id = $1 AND id = $2', [novelId, chapterId]);
    res.json({ message: 'Chương đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa chương:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa chương' });
  }
});

// Lấy danh sách tất cả bài viết
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài viết:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách bài viết' });
  }
});

// Lấy chi tiết một bài viết dựa trên ID
app.get('/api/posts/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);
    const post = result.rows[0];
    if (!post) {
      return res.status(404).json({ error: 'Bài viết không tồn tại' });
    }
    res.json(post);
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết bài viết:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy chi tiết bài viết' });
  }
});

// Thêm một bài viết mới
app.post('/api/posts', async (req, res) => {
  const { title, content, image, user_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, image, user_id, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *',
      [title, content, image, user_id]
    );
    const newPost = result.rows[0];
    res.json(newPost);
  } catch (error) {
    console.error('Lỗi khi thêm bài viết mới:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm bài viết mới' });
  }
});

// Sửa một bài viết
app.put('/api/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const { title, content, image } = req.body;

  try {
    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2, image = $3 WHERE id = $4 RETURNING *',
      [title, content, image, postId]
    );
    const updatedPost = result.rows[0];
    res.json(updatedPost);
  } catch (error) {
    console.error('Lỗi khi sửa bài viết:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi sửa bài viết' });
  }
});

// Xóa một bài viết
app.delete('/api/posts/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [postId]);
    res.json({ message: 'Bài viết đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa bài viết:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa bài viết' });
  }
});

// Lấy danh sách bình luận của một bài viết
app.get('/api/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;

  try {
    const result = await pool.query(
      'SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = $1 ORDER BY created_at ASC',
      [postId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Lỗi khi lấy bình luận:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy bình luận' });
  }
});

app.post('/api/posts/:id/comments', async (req, res) => {
  const { user_id, content } = req.body;
  const postId = req.params.id;

  try {
    const result = await pool.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [postId, user_id, content]
    );
    const newComment = result.rows[0];
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lưu bình luận' });
  }
});
app.post('/api/pending-novels', async (req, res) => {
  const { title, author, image, description, nation, category_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO pending_novels (title, author, image, description, nation, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, author, image, description, nation, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Lỗi khi tạo truyện chờ duyệt mới:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo truyện chờ duyệt mới' });
  }
});

// Lấy danh sách các tiểu thuyết chờ duyệt
app.get('/api/pending-novels', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pending_novels');
    res.json(result.rows);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tiểu thuyết chờ duyệt:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách tiểu thuyết chờ duyệt' });
  }
});

// Lấy tiểu thuyết chờ duyệt theo ID
app.get('/api/pending-novels/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM pending_novels WHERE id = $1', [id]);
    const pendingNovel = result.rows[0];
    
    if (!pendingNovel) {
      return res.status(404).json({ error: 'Không tìm thấy tiểu thuyết chờ duyệt' });
    }
    
    res.json(pendingNovel);
  } catch (error) {
    console.error('Lỗi khi lấy tiểu thuyết chờ duyệt:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});

// Lấy danh sách tiểu thuyết đã duyệt
app.get('/api/approved-novels', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM approved_novels');
    res.json(result.rows);
  } catch (error) {
    console.error('Lỗi khi lấy tiểu thuyết đã duyệt:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});

// Thêm tiểu thuyết đã duyệt
app.post('/api/approved-novels', async (req, res) => {
  const { title, author, image, description, nation, category_id, user_id, approved_at } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO approved_novels (title, author, image, description, nation, category_id, user_id, approved_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, author, image, description, nation, category_id, user_id, approved_at]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Lỗi khi thêm tiểu thuyết đã duyệt:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});

// Xóa tiểu thuyết chờ duyệt
app.delete('/api/pending-novels/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM pending_novels WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Không tìm thấy tiểu thuyết chờ duyệt để xóa' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Lỗi khi xóa tiểu thuyết chờ duyệt:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});

app.get('/api/search', async (req, res) => {
  const query = req.query.query;
  try {
    const novels = await Novel.find({ title: { $regex: query, $options: 'i' } });
    res.json(novels);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm' });
  }
});



app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
