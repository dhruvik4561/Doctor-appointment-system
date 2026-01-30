import doctorModel from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js"
import bcrypt from 'bcrypt'

// Doctor Login
export const doctorLogin = async (req, res) => {
    console.log('request body:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    try {
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }
        res.status(200).json({
            success: true,
            message: "Login successful",
            doctor: {
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                speciality: doctor.speciality,
                degree: doctor.degree,
                experience: doctor.experience,
            },
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAppointmentsByDoctorEmail = async (req, res) => {
    try {
        const { email } = req.query;
        console.log("Received doctor email:", email);
        if (!email) {
            return res.status(400).json({ success: false, message: "Doctor email is required" });
        }
        const doctor = await doctorModel.findOne({ email: email.trim().toLowerCase() });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        const appointments = await Appointment.find({ doctorId: doctor._id })
            .populate("patientId")
            .exec();
        console.log("Fetched Appointments:", appointments);
        if (appointments.length === 0) {
            return res.status(200).json({ success: true, appointments: [], message: "No appointments found" });
        }
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error.message);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
};


// doctor profile
export const getDoctorProfile = async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    try {
        const doctor = await doctorModel.findOne({ email }).select('-password');
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.status(200).json({
            success: true,
            doctor: {
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                image: doctor.image,
                speciality: doctor.speciality,
                degree: doctor.degree,
                experience: doctor.experience,
                about: doctor.about,
                fees: doctor.fees,
                available: doctor.available,
                address: doctor.address,
                slots_booked: doctor.slots_booked,
                date: doctor.date,
            },
        });
    } catch (error) {
        console.error("Error fetching doctor profile:", error.message);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
    }
};

// Change Availability
export const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body;
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required" });
        }
        const docData = await doctorModel.findById(docId);
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        docData.available = !docData.available;
        await docData.save();
        console.log(`Doctor availability changed: ${docData.name} is now ${docData.available ? "Available" : "Unavailable"}`);

        return res.status(200).json({
            success: true,
            message: `Doctor is now ${docData.available ? "available" : "unavailable"}`,
            available: docData.available,
          });
          
    } catch (error) {
        console.error('Error changing availability:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Doctor List
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Fetch Notifications
export const getNotifications = async (req, res) => {
    try {
        const { data } = await axios.get(`http://localhost:5001/api/doctor/notifications?doctorId=${doctorData._id}`);
        if (data.success) {
            setNotifications(data.notifications);
        }
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
};

export const getDoctorDashboardData = async (req, res) => {
    try {
        const { doctorId } = req.query;
        if (!doctorId) {
            return res.status(400).json({ success: false, message: 'Doctor ID is required' });
        }
        console.log("fetching data for doctor ID");
        const appointments = await Appointment.find({ doctorId });
        console.log("appointments found");
        const doctor = await doctorModel.findById(doctorId);
        const doctorFees = doctor?.fees || 0;

        const totalAppointments = appointments.length;
        const totalEarnings = appointments
            .filter(appointment => appointment.status === 'Completed' || appointment.status === 'Accepted')
            .reduce((acc, curr) => acc + (curr.fees || doctorFees), 0); 
        
        const pendingAppointments = appointments.filter(appt => appt.status === 'Pending').length;

        console.log('Total Appointments:', totalAppointments);
        console.log('Total Earnings:', totalEarnings);
        console.log('Pending Appointments:', pendingAppointments);

        res.json({ success: true, totalAppointments, totalEarnings, pendingAppointments });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { doctorList }