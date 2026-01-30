import express from 'express'
import { addDoctor, allDoctors, deleteDoctor,getAdminStats,getMonthlyAppointments,getWeeklyAppointments } from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'
import { changeAvailablity } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@gmail.com' && password === 'admin123') {
        res.json({ success: true, token: 'admin-token' });
    } else {
        res.json({ success: false, message: 'Invalid email or password' });
    }
});
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.delete('/delete-doctor/:doctorId', authAdmin, deleteDoctor)
adminRouter.post('/change-availability', authAdmin, changeAvailablity)
adminRouter.get('/stats',getAdminStats);
adminRouter.get('/monthly-appointments',authAdmin,getMonthlyAppointments)
adminRouter.get('/weekly-appointments',authAdmin,getWeeklyAppointments)

export default adminRouter