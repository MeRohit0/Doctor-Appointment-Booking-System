import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';

const doctorAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const doctor = await Doctor.findById(decoded.id);

    if (!doctor) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    req.user = doctor;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

export default doctorAuth;
