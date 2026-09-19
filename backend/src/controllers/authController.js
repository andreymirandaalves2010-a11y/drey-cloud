const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  );
};

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const connection = await pool.getConnection();

      // Check if user exists
      const [existingUser] = await connection.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingUser.length > 0) {
        await connection.release();
        return res.status(409).json({ error: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const [result] = await connection.query(
        'INSERT INTO users (name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, NOW())',
        [name, email, hashedPassword, 'USER']
      );

      await connection.release();

      const user = { id: result.insertId, email, role: 'USER' };
      const token = generateToken(user);

      res.status(201).json({
        message: 'User created successfully',
        token,
        user,
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const connection = await pool.getConnection();

      const [users] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      await connection.release();

      if (users.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = users[0];

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user);

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  },

  logout: (req, res) => {
    res.json({ message: 'Logged out successfully' });
  },

  getMe: async (req, res) => {
    try {
      const connection = await pool.getConnection();

      const [users] = await connection.query(
        'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
        [req.user.id]
      );

      await connection.release();

      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(users[0]);
    } catch (error) {
      console.error('GetMe error:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },
};

module.exports = authController;
