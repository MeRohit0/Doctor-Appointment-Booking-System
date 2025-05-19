import express from "express";
import bcrypt from "bcryptjs";
import Patient from "../models/Patient.js";
import generateToken from "../utils/generateToken.js";


const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const userExists = await Patient.findOne({ email });

    if (userExists){
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Patient.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    res.status(201).json({
      message: 'User created',
      token: generateToken(newUser._id , "user")
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User Signin
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;