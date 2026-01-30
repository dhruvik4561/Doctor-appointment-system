import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const MyAppointment = () => {
  const { doctorData } = useContext(DoctorContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [suggestions, setSuggestions] = useState('');
  const [medicineDetails, setMedicineDetails] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5001/api/doctor/appointments-by-email?email=${doctorData.email}`);
      const sorted = data.appointments.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAppointments(sorted);
      toast.success("Appointments fetched successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorData?.email) {
      fetchAppointments();
    }
  }, [doctorData?.email]);

  useEffect(() => {
    setVisibleCount(6);
  }, [filter]);

  const handleAppointmentClick = (appointmentId) => {
    const selected = appointments.find(appt => appt._id === appointmentId);
    if (!selected) return toast.error("Appointment not found!");

    setSelectedAppointment(selected);
    setSelectedPatient({
      name: selected.patientName,
      phone: selected.phone,
      email: selected.email || "Not Provided",
      gender: selected.patientId?.gender || "Not provided",
      age: selected.patientId?.age || "Not provided",
      disease: selected.patientId?.disease || "Not provided",
      description: selected.patientId?.description || "Not provided",
      doctorSuggestions: selected.doctorSuggestions || "",
      medicineInfo: selected.medicineInfo || "",
    });
  };

  const handleSubmit = async () => {
    if (!selectedAppointment) return toast.error("No appointment selected!");
    if (!suggestions.trim() && !medicineDetails.trim())
      return toast.warn("Please write either suggestions or medicine details.");

    setIsSaving(true);
    try {
      await axios.put(
        `http://localhost:5001/api/appointments/update/${selectedAppointment._id}`,
        { suggestions, medicineDetails }
      );
      toast.success("Details saved successfully!");
      setSuggestions('');
      setMedicineDetails('');
      setSelectedAppointment(null);
      fetchAppointments();
    } catch (error) {
      toast.error("Failed to update appointment");
    } finally {
      setIsSaving(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/api/appointments/respond/${id}`, { status: newStatus });
      toast.success(`Appointment ${newStatus}`);
      fetchAppointments();
    } catch {
      toast.error("Failed to update appointment status");
    }
  };

  const filteredAppointments = filter === "All"
    ? appointments
    : appointments.filter(appt => appt.status === filter);

  const visibleAppointments = filteredAppointments.slice(0, visibleCount);

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-r from-blue-100 to-blue-300">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">My Appointments</h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {["All", "Pending", "Accepted", "Rejected", "Completed"].map((status) => {
          const color =
            status === "Pending" ? "text-yellow-500"
              : status === "Accepted" ? "text-blue-600"
                : status === "Rejected" ? "text-red-500"
                  : status === "Completed" ? "text-green-500"
                    : "text-gray-600";
          return (
            <button key={status} onClick={() => setFilter(status)} className={`relative font-semibold px-4 py-2 rounded-full transition-all duration-200 ease-in-out ${filter === status
              ? `${color} bg-white shadow-md scale-105`
              : "text-gray-500 hover:scale-105 hover:bg-white"}`}>
              {status === "Pending" && "🟡 "}
              {status === "Accepted" && "🔵 "}
              {status === "Rejected" && "🔴 "}
              {status === "Completed" && "🟢 "}
              {status === "All" && "📋 "}
              {status}
              {filter === status && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-6 bg-current rounded-full mt-1"></span>
              )}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-80">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found</p>
      ) : (
        <>
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleAppointments.map((appointment) => (
              <div key={appointment._id} className="p-6 bg-white shadow-lg rounded-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => handleAppointmentClick(appointment._id)}>
                <h2 className="text-xl font-semibold text-blue-800">{appointment.patientName}</h2>
                <p className="text-gray-600 mt-2"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p className="text-gray-600"><strong>Time:</strong> {appointment.time}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className={`text-lg font-bold ${appointment.status === 'Completed' ? 'text-green-500' :
                    appointment.status === 'Accepted' ? 'text-blue-600' :
                      appointment.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                    Status: {appointment.status}
                  </p>
                  {appointment.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); updateStatus(appointment._id, 'Accepted'); }}>
                        <img src={assets.tick_icon} className="w-10 h-10" title="Accept" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); updateStatus(appointment._id, 'Rejected'); }}>
                        <img src={assets.rejected_icon} className="w-10 h-10" title="Reject" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filteredAppointments.length && (
            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-200"
                onClick={() => setVisibleCount(prev => prev + 6)}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {selectedAppointment && selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 transition-opacity duration-300 z-50">
          <div className="bg-gradient-to-r from-blue-100 to-blue-300 p-8 rounded-2xl shadow-xl w-120 transform scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-extrabold text-blue-600 text-center mb-4">Patient Details</h2>

            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {selectedPatient.name}</p>
              <p><strong>Phone:</strong> {selectedPatient.phone}</p>
              <p><strong>Gender:</strong> {selectedPatient.gender}</p>
              <p><strong>Age:</strong> {selectedPatient.age}</p>
              <p><strong>Disease:</strong> {selectedPatient.disease}</p>
              <p><strong>Description:</strong> {selectedPatient.description}</p>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2">
                <img src={assets.clipboard_icon} alt="Clipboard Icon" className="w-6 h-6" />
                <label className="text-gray-600 font-semibold">Clinical Recommendations:</label>
              </div>
              <textarea
                className="w-full border border-blue-400 focus:ring-2 focus:ring-blue-500 p-3 rounded-md shadow-sm transition-all duration-200 mt-2"
                placeholder="Write your suggestions..."
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2">
                <img src={assets.capsule_icon} alt="Capsule Icon" className="w-6 h-6" />
                <label className="text-gray-600 font-semibold">Pharmacological Treatment:</label>
              </div>
              <textarea
                className="w-full border border-green-400 focus:ring-2 focus:ring-green-500 p-3 rounded-md shadow-sm transition-all duration-200 mt-2"
                placeholder="Medicine Details..."
                value={medicineDetails}
                onChange={(e) => setMedicineDetails(e.target.value)}
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                disabled={isSaving}
                className={`bg-green-500 ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'} text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105`}
                onClick={handleSubmit}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
                onClick={() => {
                  setSelectedAppointment(null);
                  setSuggestions('');
                  setMedicineDetails('');
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
