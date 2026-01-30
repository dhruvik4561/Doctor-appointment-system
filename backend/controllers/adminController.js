import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import Appointment from "../models/appointmentModel.js"

// api for adding doctor

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
    const imageFile = req.file
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Missing Details" })
    }
    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    } else {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const doctorData = {
      name,
      email,
      password,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    return res.status(201).json({ success: true, message: "Doctor Added" })

  } catch (error) {
    console.error("Error Adding Doctor:", error);
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    const imageUrl = doctor.image;
    if (imageUrl) {
      const imagePublicId = imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imagePublicId);
    }
    await doctorModel.findByIdAndDelete(doctorId);

    res.status(200).json({ success: true, message: "Doctor deleted successfully" });

  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// all doctors list
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}, '-password')
    res.json({ success: true, doctors })
  } catch (error) {
    console.error("Error Fetching Doctors:", error);
    res.json({ success: false, message: error.message })
  }
}

const getAdminStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const availableDoctors = await doctorModel.countDocuments();
    const patientsTreated = await Appointment.countDocuments({ status: { $in: ["Completed", "Accepted"] } });

    res.status(200).json({
      totalAppointments,
      availableDoctors,
      patientsTreated
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error });
  }
};

const getMonthlyAppointments = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const appointments = await Appointment.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthlyData = months.map((month, index) => {
      const found = appointments.find((item) => item._id === index + 1);
      return {
        name: month,
        appointments: found ? found.count : 0,
      };
    });
    res.status(200).json(monthlyData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch monthly data", error });
  }
};

const getWeeklyAppointments = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const appointments = await Appointment.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $week: "$date" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const weeklyData = appointments.map((item, index) => ({
      name: `Week ${item._id}`,
      appointments: item.count,
    }));

    res.status(200).json(weeklyData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch weekly data", error });
  }
};


export { addDoctor, allDoctors, deleteDoctor, getAdminStats, getMonthlyAppointments,getWeeklyAppointments }