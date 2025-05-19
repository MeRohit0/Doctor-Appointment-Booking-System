import express from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

// Admin Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    res.status(201).json({
      message: 'Admin created',
      token: generateToken(newAdmin._id, 'admin')
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin Login
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      token: generateToken(admin._id, 'admin')
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
