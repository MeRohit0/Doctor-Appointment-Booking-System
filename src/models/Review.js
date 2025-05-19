import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  comment: { type: String },
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;