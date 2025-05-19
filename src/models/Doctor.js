import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  specialization: { type: String },
  bio: { type: String },
  availableSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }],
  ratings: [{ type: Number }]
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;