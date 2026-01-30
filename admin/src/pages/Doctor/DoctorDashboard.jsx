import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const { doctorData } = useContext(DoctorContext);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readStatus, setReadStatus] = useState({});

  const handleMarkAsRead = (id) => {
    setReadStatus(prev => ({ ...prev, [id]: true }));

  };

  // Fetch Doctor Data
  const fetchDoctorData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5001/api/doctor/dashboard-data?doctorId=${doctorData._id} `);
      if (data.success) {
        console.log("api response", data)
        setIsAvailable(data?.doctor?.isAvailable || false);
        setTotalAppointments(data?.totalAppointments || 0);
        setTotalEarnings(data?.totalEarnings || 0);
        setPendingAppointments(data?.pendingAppointments || 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch doctor data');
    } finally {
      setLoading(false);
    }
  };

  // Handle Availability Change
  const handleAvailabilityChange = async () => {
    try {
      const { data } = await axios.post(`http://localhost:5001/api/doctor/change-availability`, { docId: doctorData._id, });

      if (data.success) {
        toast.success('Availability updated!');
        setIsAvailable((prev) => !prev);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error changing availability:', error);
      toast.error('Failed to update availability');
    }
  };

  // Fetch Notifications
  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5001/api/notification/${doctorData._id}`);
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      toast.error('Failed to load notifications');
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = Math.floor((now - date) / 60000);

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (doctorData?._id) {
      fetchNotifications();
      fetchDoctorData();
    }
  }, [doctorData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <p className="text-lg font-semibold text-blue-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className='w-full p-8 bg-gray-50 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100'>
      <h1 className='text-3xl font-extrabold text-blue mb-10'>Hello {doctorData?.name} ! Here's Your Daily Overview 👋</h1>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10'>
        <div className='p-6 bg-white rounded-lg shadow-md border border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-600'>Total Appointments</h2>
          <p className='text-3xl font-bold text-blue-600 mt-2'>{totalAppointments}</p>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-md border border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-600'>Total Earnings</h2>
          <p className='text-3xl font-bold text-green-500 mt-2'>₹{totalEarnings}</p>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-md border border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-600'>Pending Appointments</h2>
          <p className='text-3xl font-bold text-yellow-500 mt-2'>{pendingAppointments}</p>
        </div>
      </div>

      {/* Availability Management Section */}
      <div className="w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 transition-all duration-500">

          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Stay in Control of Your Schedule
          </h1>

          <div className={`flex flex-col items-center mb-8`}>
            <div
              className={`w-32 h-32 flex items-center justify-center rounded-full text-white text-md font-bold transition-all duration-500 ${isAvailable ? 'bg-green-500 animate-bounce' : 'bg-red-500 animate-pulse'
                }`}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </div>
            <p className="mt-4 text-gray-600 text-lg">
              {isAvailable
                ? "You're currently available. Patients can book appointments with you 😊"
                : "You're currently unavailable. Update your status when you're ready 😊"}
            </p>
          </div>

          <button
            onClick={handleAvailabilityChange}
            className={`w-full py-3 text-white text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${isAvailable ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}>
            {isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
          </button>

          <div className="mt-8 text-center text-gray-500">
            <p className="text-sm">"Your dedication saves lives. Thank you for your service!"</p>
          </div>
        </div>
      </div>


      {/* Notifications Section */}
      <div className="mt-10 w-full">
        <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-800">{notification.message}</p>
                  <span className="text-sm text-gray-400">{formatTimeAgo(notification.date)}</span>
                </div>

                <button
                  onClick={() => handleMarkAsRead(notification._id)}
                  className="ml-4 text-green-600 hover:text-green-800 transition"
                  title="Mark as read"
                >
                  <CheckCircle size={22} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notifications available</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;

