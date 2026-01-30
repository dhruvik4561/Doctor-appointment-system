import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  message: {
    type: String,
    required: true, 
  },
  isRead : {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
},{timestamps: true});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification; 

