import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
}, { timestamps: true });

const Slot = mongoose.model('Slot', slotSchema);

export default Slot;