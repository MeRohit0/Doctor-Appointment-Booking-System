import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

config();

import userRoutes from './routes/userAuth.js';
import doctorRoutes  from './routes/doctorAuth.js';
import adminRoutes  from './routes/adminAuth.js';
import appointmentRoutes from './routes/appointment.js';
import reviewRoutes from './routes/review.js';
import slotRoutes from './routes/slot.js';

const app = express();

// Middleware
app.use(cors());
app.use(json()); // For parsing application/json

// Routes
app.use('/user', userRoutes);
app.use('/doctor', doctorRoutes);
app.use('/admin', adminRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/review', reviewRoutes);
app.use('/slots', slotRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Doctor Appointment Booking API is running...');
});

// Connect to MongoDB and start server
connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('MongoDB Connected');

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});
