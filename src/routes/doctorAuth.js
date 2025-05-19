import express from 'express';
import bcrypt from 'bcryptjs';
import Doctor from '../models/Doctor.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

// Doctor Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, phone, specialization } = req.body;

  try {
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) return res.status(400).json({ message: 'Doctor already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      specialization
    });

    res.status(201).json({
      message: 'Doctor created',
      token: generateToken(newDoctor._id, 'doctor')
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Doctor Login
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      token: generateToken(doctor._id, 'doctor')
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
