import express from 'express';
import Review from '../models/Review.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Post a review
router.post('/', auth, async (req, res) => {
  try {
    const { doctorId, comment, rating } = req.body;

    const newReview = await Review.create({
      doctorId,
      patientId: req.user._id,
      comment,
      rating
    });

    res.status(201).json({ message: 'Review added', review: newReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all reviews for a doctor
router.get('/:doctorId', async (req, res) => {
  try {
    const reviews = await Review.find({ doctorId: req.params.doctorId })
      .populate('patientId', 'name');

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
