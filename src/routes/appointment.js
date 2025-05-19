import express from 'express';
import Appointment from '../models/Appointment.js';
import Slot from '../models/Slot.js';
import auth from '../middleware/authMiddleware.js';
import doctorAuth from '../middleware/doctorAuth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Book appointment (User)
router.post('/book', auth, async (req, res) => {
  try {
    const { doctorId, slotId } = req.body;

    // Check if slot exists and not booked
    const slot = await Slot.findOne({ _id: slotId, isBooked: false });
    if (!slot) return res.status(400).json({ message: "Slot is not available" });

    // Create appointment
    const appointment = await Appointment.create({
      doctorId,
      patientId: req.user._id,
      slotId,
      appointmentNumber: uuidv4()
    });

    // Mark slot as booked
    slot.isBooked = true;
    await slot.save();

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointmentId: appointment._id,
      appointmentNumber: appointment.appointmentNumber
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all appointments for patient
router.get('/my-appointments', auth("user"), async (req, res) => {
  
  try {
  
    const appointments = await Appointment.find({ patientId: req.user._id })
    .populate('doctorId', 'name email')
    .populate('slotId');
  
    res.status(200).json(appointments);
  
  } catch (err) {
  
    res.status(500).json({ message: err.message });
  }

});

// Get all appointments for doctor
router.get('/doctor-appointments', doctorAuth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user._id })
      .populate('patientId', 'name email')
      .populate('slotId');

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Doctor updates appointment status
router.patch('/:id/status', doctorAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const appointment = await Appointment.findOne({ _id: id, doctorId: req.user._id });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: `Appointment ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
