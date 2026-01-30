import express from 'express';
const router = express.Router();
import Notification from '../models/NotificationModel.js';

// GET notifications for a doctor
router.get('/:doctorId', async (req, res) => {
    try {
        const notifications = await Notification.find({ doctorId: req.params.doctorId }).sort({ date: -1 });
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        console.error("Error fetching notifications:", err);
        res.status(500).json({ success: false, message: 'server error' });
    }
});

// POST new notification
router.post('/', async (req, res) => {
    console.log("POST /api/notification hit with:", req.body);
    try {
        const { doctorId, message } = req.body;
        const newNotification = new Notification({ doctorId, message });
        await newNotification.save();
        res.status(200).json({ success: true, notification: newNotification });
    } catch (error) {
        console.log("Error saving notification:", error);
        res.status(500).json({ success: false, message: 'Failed to add notification' });
    }
});


export default router;
