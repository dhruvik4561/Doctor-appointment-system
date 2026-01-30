import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "patients", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  phone: { type: String, required: true },
  patientName: { type: String, required: true },
  gender: { type: String },
  age: { type: Number },
  disease: { type: String },
  description: { type: String },
  doctorName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
    default: 'Pending'
  },
  doctorSuggestions: { type: String, default: '' },
  medicineInfo: { type: String, default: '' },
  fees: { type: Number, required: true, default: 0 }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;  
