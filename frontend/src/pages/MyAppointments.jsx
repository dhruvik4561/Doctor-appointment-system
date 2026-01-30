import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { assets } from '../assets/assets'
import { motion } from "framer-motion"

const MyAppointments = () => {
  const { userData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userData?.phone) {
        console.log("user Phone number is missing");
        setError("Phone number is missing");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching appointments for:", userData.phone);
        const response = await axios.get(`http://localhost:5001/api/appointments/all`);
        console.log("Appointments received:", response.data);

        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [userData]);

  const userPhoneNumber = userData?.phone;

  const filteredAppointments = appointments
    .filter((item) => item.phone === userPhoneNumber)
    .filter((item) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "completed") return item.status === "Completed";
      if (filterStatus === "rejected") return item.status === "Rejected";
      if (filterStatus === "pending") return item.status === "Pending";
      if (filterStatus === "accepted") return item.status === "Accepted";
      return true;
    });


  // Cancel Appointment Function
  const handleCancel = async (appointmentId) => {

    console.log("Cancelling appointment with ID:", appointmentId);

    if (!appointmentId) {
      toast.error("Invalid appointment ID");
      return;
    }
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const response = await axios.delete(`http://localhost:5001/api/appointments/${appointmentId}`);

      if (response.data.success) {
        toast.success("Appointment cancelled successfully");
        setAppointments((prev) => prev.filter((appointment) => appointment._id !== appointmentId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Cancel Error:", error);
      toast.error("Error cancelling appointment");
    }
  };

  // Pagination 
  const indexOfLast = currentPage * appointmentsPerPage;
  const indexOfFirst = indexOfLast - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 flex justify-center items-center gap-3">
        My Appointments
        <img className="w-9 h-9" src={assets.appointment_icon} alt="icon" />
      </h2>
  
      {/* Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          className="bg-white text-gray-700 py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
      </div>
  
      {/* Appointments Grid */}
      {loading ? (
        <p className="text-center text-blue-700 text-lg font-medium">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : filteredAppointments.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {currentAppointments.map((item, index) => (
            <motion.div
              key={item._id || index}
              className="flex flex-col gap-3 p-5 bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold text-blue-800">{item.doctorName}</p>
                  <p className="text-gray-500 text-sm">{item.date} | {item.time}</p>
                  <p className="text-gray-700 mt-1">
                    Patient: <span className="text-teal-700 font-medium">{item.patientName}</span>
                  </p>
                  <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold
                    ${item.status === "Accepted" && "bg-green-200 text-green-800"}
                    ${item.status === "Rejected" && "bg-red-200 text-red-700"}
                    ${item.status === "Pending" && "bg-yellow-200 text-yellow-800"}
                    ${item.status === "Completed" && "bg-gray-200 text-gray-700"}`}>
                    {item.status}
                  </span>
                </div>
  
                {item.status === "Pending" && (
                  <button
                    onClick={() => handleCancel(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm h-fit"
                  >
                    Cancel
                  </button>
                )}
              </div>
  
              {(item.doctorSuggestions || item.medicineInfo) && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  {item.doctorSuggestions && (
                    <p className="text-sm text-blue-900 flex gap-2 items-start">
                      <img src={assets.clipboard_icon} className="w-5 h-5 mt-0.5" />
                      <span><strong>Advice:</strong> {item.doctorSuggestions}</span>
                    </p>
                  )}
                  {item.medicineInfo && (
                    <p className="text-sm text-blue-900 mt-2 flex gap-2 items-start">
                      <img src={assets.capsule_icon} className="w-5 h-5 mt-0.5" />
                      <span><strong>Medicine:</strong> {item.medicineInfo}</span>
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
  
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-3 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-blue-100 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded-full shadow ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-blue-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
  
};

export default MyAppointments;
