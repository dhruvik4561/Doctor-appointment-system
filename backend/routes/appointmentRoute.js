import express from "express";
import mongoose from "mongoose";
import Patient from "../models/patientModel.js";
import Appointment from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import Notification from "../models/NotificationModel.js";

const router = express.Router();

//book appointment
router.post("/book", async (req, res) => {
  console.log("Received Appointment Data:", req.body);

  try {
    const { phone, doctorId, doctorName, date, time } = req.body;

    if (!phone || !doctorId || !doctorName || !date || !time) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found!"});
    }

    const patient = await Patient.findOne({ phone });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found! Please fill the patient form first" });
    }

    if (patient.used) {
      return res.status(400).json({
        error: "You have already used the patient form. Please refill it to book a new appointment.",
      });
    }

  
    // const pendingAppointment = await Appointment.findOne({
    //   phone,
    //   status: "Pending",
    // });

    // if (pendingAppointment) {
    //   return res.status(400).json({
    //     error: "You have already booked an appointment. Please complete it before booking another.",
    //   });
    // }

    const existingAppointment = await Appointment.findOne({
      phone,
      doctorId,
      date,
      time,
      status: { $in: ["Pending", "Accepted"] },
    });

    if (existingAppointment) {
      return res.status(400).json({
        error: "Appointment already booked for this date and time!",
      });
    }

    const newAppointment = new Appointment({
      patientId: patient._id,
      patientName: patient.name,
      phone,
      doctorId,
      doctorName,
      date,
      time,
      status: "Pending",
      fees: doctor.fees,
    });

    const savedAppointment = await newAppointment.save();
    console.log("Appointment saved:", savedAppointment);

    // Link appointment to patient
    patient.appointment.push({
      doctorId: doctorId,
      doctorName: doctorName,
      date: date,
      time: time,
      status: "Pending",
      doctorSuggestions: '',
      medicineInfo: '',
      fees: doctor.fees,
    });

    patient.used = true;
    await patient.save();

    const formattedDate = new Date(date).toLocaleDateString();
    const formattedTime = time;
    const message = `📅 New appointment request from ${patient.name} on ${formattedDate} at ${formattedTime}.`;
    const notification = await Notification.create({
      doctorId,
      message,
    });
    console.log("Notification created:", notification);

    res.status(200).json({
      success: true,
      message: "Appointment booked and doctor notified!",
    });
  } catch (error) {
    console.error("Error saving appointment", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.post("/book", async (req, res) => {
//   console.log("Received Appointment Data:", req.body);

//   try {
//     const { phone, doctorId, doctorName, date, time } = req.body;

//     if (!phone || !doctorId || !doctorName || !date || !time) {
//       return res.status(400).json({ error: "All fields are required!" });
//     }

//     const doctor = await doctorModel.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({ error: "Doctor not found!" });
//     }

//     const patient = await Patient.findOne({ phone });
//     if (!patient) {
//       return res.status(404).json({ error: "Patient not found!" });
//     }

//     // Check if patient has already booked
//     if (patient.used) {
//       return res.status(400).json({ error: "You have already booked an appointment. Please wait or contact support." });
//     }

//     const anyAppointment = await Appointment.findOne({ phone });
//     if (anyAppointment) {
//       return res.status(400).json({
//         error: "You have already booked an appointment. Please fill the patient form again to book another one.",
//       });
//     }

//     const existingAppointment = await Appointment.findOne({ phone, doctorId, date, time, status: { $in: ["Pending", "Accepted"] } });
//     if (existingAppointment) {
//       return res.status(400).json({ error: "Appointment already booked for this date and time!" });
//     }

//     const newAppointment = new Appointment({
//       patientId: patient._id,
//       patientName: patient.name,
//       phone,
//       doctorId,
//       doctorName,
//       date,
//       time,
//       status: "Pending",
//       fees: doctor.fees,
//     });

//     const savedAppointment = await newAppointment.save();
//     console.log("Appointment saved:", savedAppointment);
//     // Mark patient as used
//     patient.appointment.push(savedAppointment._id);
//     patient.used = true;
//     await patient.save();
//     // await Patient.deleteOne({ _id: patient._id });

//     const formattedDate = new Date(date).toLocaleDateString();
//     const formattedTime = time;
//     const message = `📅 New appointment request from ${patient.name} on ${formattedDate} at ${formattedTime}.`;
//     const notification = await Notification.create({
//       doctorId,
//       message,
//     });
//     console.log("Notification created:", notification);
//     res.status(200).json({
//       success: true,
//       message: "Appointment booked and doctor notified!"
//     });
//   } catch (error) {
//     console.error("Error saving appointment", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/check/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const patient = await Patient.findOne({ phone });

    if (!patient) {
      return res.status(404).json({ exists: false });
    }

    res.status(200).json({ exists: true });
  } catch (error) {
    console.error("Error checking patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    const appointments = await Appointment.find({ phone }).sort({ data: -1 });

    if (!appointments.length) {
      return res.status(404).json({ success: false, message: "No appointments found" });
    }
    res.json({ success: true, appointments });

  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const appointments = await Appointment.find();

    const appointmentsWithNames = await Promise.all(
      appointments.map(async (appointment) => {
        const patient = await Patient.findOne({ phone: appointment.phone });
        return {
          ...appointment.toObject(),
          patientName: patient ? patient.name : "Unknown",
        };
      })
    );

    res.json(appointmentsWithNames);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/appointments/:phone", async (req, res) => {
  try {
    const phone = req.params.phone;
    const appointments = await Appointment.find({ phone });

    const updatedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        const doctor = await doctorModel.findOne({ name: appointment.doctorName });
        return {
          ...appointment.toObject(),
          doctorImage: doctor ? doctor.image : null,
          patientName: appointment.patientName,

        };
      })
    );

    res.json({ success: true, appointments: updatedAppointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    if (!doctorId) {
      return res.status(400).json({ success: false, message: 'Doctor ID is required' });
    }

    const appointments = await Appointment.find({ doctorId });

    if (!appointments.length) {
      return res.status(404).json({ success: false, message: 'No appointments found for this doctor' });
    }

    res.json({ success: true, appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put("/update-status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    const today = new Date().toISOString().split("T")[0];
    const appointmentDate = new Date(appointment.date).toISOString().split("T")[0];

    if (appointmentDate < today && appointment.status === "Pending") {
      appointment.status = "Completed";
      await appointment.save();
      return res.json({ success: true, message: "Appointment status updated to Completed", appointment });
    }
    res.json({ success: true, message: "No updates needed", appointment });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Backend received appointment ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(id);
    console.log("Fetched Appointment from DB:", appointment);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    const patient = await Patient.findById(appointment.patientId);

    console.log("Fetched Patient from DB:", appointment.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }
    res.json({ success: true, appointment, patient });

  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { suggestions, medicineDetails } = req.body;

    console.log("Updating Appointment ID:", id);
    console.log("Received Data:", { suggestions, medicineDetails });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    appointment.doctorSuggestions = suggestions;
    appointment.medicineInfo = medicineDetails;

    await appointment.save();
    return res.json({ success: true, message: "Appointment updated successfully!", appointment });

  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Accept or Reject an Appointment
router.put("/respond/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }

    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ success: true, message: `Appointment ${status.toLowerCase()} successfully`, appointment });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
