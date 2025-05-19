import mongoose from "mongoose";

const patientScheme = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    phone: {type : String, required : true}
},{timestamps: true});

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

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'cancelled'], default: 'pending' },
  appointmentNumber: { type: String, unique: true }
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  comment: { type: String },
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

const slotSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, default: 'admin' }
}, { timestamps: true });

const AdminModel = mongoose.model('Admin', adminSchema);

const SlotModel = mongoose.model('Slot', slotSchema);

const ReviewModel = mongoose.model('Review', reviewSchema);

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);

const DoctorModel = mongoose.model('Doctor', doctorSchema);

const PatientModel = mongoose.model('Patient', patientScheme);

module.exports = {AdminModel, SlotModel, ReviewModel, AppointmentModel, DoctorModel, PatientModel};