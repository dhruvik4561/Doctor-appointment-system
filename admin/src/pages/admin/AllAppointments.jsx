import React, { useState, useEffect } from "react";
import axios from "axios";

const statusClasses = {
  Accepted: "bg-green-500 text-white",
  Pending: "bg-yellow-500 text-white",
  Rejected: "bg-red-500 text-white",
  Completed: "bg-gray-400 text-white",
};

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const [currentPage, setCurrentPage] = useState(1);
const appointmentsPerPage = 10;
const indexOfLastAppointment = currentPage * appointmentsPerPage;
const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
const totalPages = Math.ceil(appointments.length / appointmentsPerPage);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/appointments/all");
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to fetch appointments. Please try again.");
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);


  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">All Appointments</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading appointments...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-4 text-left">Patient Name</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-left">Doctor</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map((appointment) => {
                  const appointmentDate = new Date(appointment.date);
                  const today = new Date();

                  let status = appointment.status || "Pending";
                  return (
                    <tr key={appointment._id} className="border-b hover:bg-gray-100 transition">
                      <td className="py-3 px-4">{appointment.patientName || "Unknown"}</td>
                      <td className="py-3 px-4">{appointment.phone}</td>
                      <td className="py-3 px-4">
                        {appointment.date ? appointmentDate.toLocaleDateString("en-GB") : "N/A"}
                      </td>
                      <td className="py-3 px-4">{appointment.time}</td>
                      <td className="py-3 px-4">{appointment.doctorName}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClasses[status]}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
    Previous
  </button>
  <p className="text-gray-700">Page {currentPage} of {totalPages}</p>
  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
    Next
  </button>
</div>

          </div>
        )}
      </div>
    </div>
  );

};

export default AllAppointments;