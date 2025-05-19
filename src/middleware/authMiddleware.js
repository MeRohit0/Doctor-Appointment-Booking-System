import jwt from 'jsonwebtoken';
import User from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Admin from '../models/Admin.js';

const protect = (role = null) => {
  return async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

        let model;
        if (decoded.role === 'user') model = User;
        else if (decoded.role === 'doctor') model = Doctor;
        else if (decoded.role === 'admin') model = Admin;

        req.user = await model.findById(decoded.id).select('-password');
        req.role = decoded.role;

        // Role check
        if (role && decoded.role !== role) {
          return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        next();
      } catch (err) {
        res.status(401).json({ message: 'Token failed' });
      }
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
};

export default protect;
