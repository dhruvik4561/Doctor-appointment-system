import express from 'express'
import { doctorList, doctorLogin, getDoctorProfile, changeAvailablity, getNotifications, getAppointmentsByDoctorEmail, getDoctorDashboardData } from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', doctorLogin);
doctorRouter.get('/profile', getDoctorProfile)
doctorRouter.get('/appointments-by-email', getAppointmentsByDoctorEmail);
doctorRouter.post('/change-availability', changeAvailablity);
doctorRouter.get('/notifications', getNotifications);
doctorRouter.get('/dashboard-data',getDoctorDashboardData)

export default doctorRouter;