import cron from 'node-cron';
import AppointmentModel from '../backend/models/appointmentModel.js';

cron.schedule('0 * * * *', async () => {
  console.log('Running status update job...');

  try {
    const currentDate = new Date();
    const result = await AppointmentModel.updateMany(
      { date: { $lt: currentDate }, status: 'Pending' },
      { $set: { status: 'Completed' } }
    );

    console.log(`${result.modifiedCount} appointments marked as Completed.`);
  } catch (error) {
    console.error('Error updating appointment status:', error);
  }
});
