import mongoose from "mongoose";


const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true },
    age: { type: Number, required: true, min: [0, 'Age cannot be negative'] },
    phone: { type: String, required: true, match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'] },
    disease: { type: String, required: true },
    description: { type: String, maxlength: 200 },
    used: {type: Boolean, default: false},
    appointment: [{
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
        doctorName: { type: String, required: false },
        date: { type: Date, required: true },
        time: { type: String, required: false },
    }],
});

const patientModel = mongoose.models.patients || mongoose.model('patients', patientSchema);

export default patientModel;

