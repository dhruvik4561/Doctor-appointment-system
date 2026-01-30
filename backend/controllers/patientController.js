import patientModel from "../models/patientModel.js";
import DoctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

export const addPatient = async (req, res) => {
    try {
      const { name, gender, email, age, phone, disease, description } = req.body;
  
      if (!name || !gender || !age || !phone || !disease || !description) {
        return res.status(400).json({ error: "All fields except email are required!" });
      }
  
      if (age < 0) {
        return res.status(400).json({ error: "Age cannot be negative!" });
      }
  
      const pendingAppointment = await appointmentModel.findOne({ phone, status: "Pending" });
      if (pendingAppointment) {
        return res.status(400).json({
          error: "You have already booked an appointment. Please complete it before booking another.",
        });
      }

      const existingPatient = await patientModel.findOne({ phone });

      if (existingPatient) {
        existingPatient.name = name;
        existingPatient.gender = gender;
        existingPatient.age = age;
        existingPatient.email = email;
        existingPatient.disease = disease;
        existingPatient.description = description;
        existingPatient.used = false;
        await existingPatient.save();
  
        return res.status(200).json({
          message: "Patient info updated and reset. You can now book a new appointment.",
          patient: existingPatient,
        });
      }

      const newPatient = new patientModel({
        name,
        gender,
        age,
        phone,
        disease,
        description,
        used: false, 
      });
  
      await newPatient.save();
  
      res.status(201).json({ message: "Patient added successfully!", patient: newPatient });
    } catch (error) {
      console.error("Error adding patient:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

export const getAllPatients = async (req, res) => {
    try {
        const patients = await patientModel.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: "Error fetching patients." });
    }
};


// export const bookAppointment = async (req, res) => {
//     console.log("BOOK APPOINTMENT API HIT 🚀");
//     const check = await patientModel.find();
//     console.log("All patients right now:", check);

//     try {
//         const { phone, doctorId, date, time } = req.body;

//         const existingAppointment = await appointmentModel.findOne({
//             phone,
//             status: { $in: ["Pending", "Accepted"] },
//             date,
//             time
//         });
//         if (existingAppointment) {
//             return res.status(400).json({ error: "Appointment already booked with this number." });
//         }


//         // Step 1: Check if patient exists
//         const patient = await patientModel.findOne({ phone });
//         if (!patient) {
//             return res.status(400).json({ error: "Patient information not found. Please fill the patient form first." });
//         }

//         // Step 2: Create new appointment
//         const newAppointment = new appointmentModel({
//             phone,
//             doctorId,
//             date,
//             time,
//             patientName: patient.name,
//             gender: patient.gender,
//             age: patient.age,
//             disease: patient.disease,
//             description: patient.description,
//             email: patient.email || "",
//             status: "Pending"
//         });

//         await newAppointment.save();

//         // Step 3: Delete patient form entry so next time it has to be filled again
//         const deleted = await patientModel.deleteOne({ phone });
//         console.log("Patient deleted count:", deleted.deletedCount);


//         return res.status(200).json({ message: "Appointment booked successfully!", appointment: newAppointment });
//     } catch (error) {
//         console.error("Error booking appointment:", error);
//         return res.status(500).json({ error: "Error booking appointment" });
//     }
// };

// export const createPatient = async (req, res) => {
//     const { phone } = req.body;

//     try {
//         const existing = await patientModel.findOne({ phone });
//         if (existing) {
//             return res.status(400).json({ error: "Patient already exists. Please book your appointment." });
//         }

//         const newPatient = new patientModel(req.body);
//         await newPatient.save();

//         res.status(200).json({ message: "Patient registered successfully." });
//     } catch (err) {
//         console.log("Error in createPatient:", err);
//         res.status(500).json({ error: "Server error." });
//     }
// };

export const checkPatient = async (req, res) => {
    try {
        const patient = await patientModel.findOne({ phone: req.params.phone });
        if (patient) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (err) {
        console.log("Error in checkPatient:", err);
        res.status(500).json({ error: "Server error." });
    }
};