import express from 'express';
import Slot from '../models/Slot.js';
import doctorAuth from '../middleware/doctorAuth.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Doctor adds available slot
router.post('/add', doctorAuth, async (req, res) => {
  try {
    const { date, time } = req.body;

    const newSlot = await Slot.create({
      doctorId: req.user._id,
      date,
      time
    });

    res.status(201).json({ message: 'Slot created', slot: newSlot });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Doctor removes slot
router.delete('/remove/:id', doctorAuth, async (req, res) => {
  try {
    const slot = await Slot.findOneAndDelete({ _id: req.params.id, doctorId: req.user._id });
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    res.status(200).json({ message: 'Slot removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get available slots for a doctor (User)
router.get('/doctor/:doctorId', auth, async (req, res) => {
  try {
    const slots = await Slot.find({ doctorId: req.params.doctorId, isBooked: false });
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
