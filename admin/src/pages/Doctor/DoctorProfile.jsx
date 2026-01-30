import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../../context/DoctorContext';

const DoctorProfile = () => {

  const { doctorData, fetchDoctorData, email } = useContext(DoctorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorData) {
      fetchDoctorData();
    }
  }, [doctorData, fetchDoctorData]);

  if (!doctorData) {
    return <p className="flex items-center text-lg font-semibold text-blue-600">Loading profile data...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl overflow-hidden ">

        {/* Profile Section */}
        <div className="p-12 flex flex-col md:flex-row items-center gap-8">
          <img
            src={doctorData?.image || ''}
            alt="Doctor Profile"
            className="w-40 h-40 object-cover rounded-full border-4 border-indigo-400"/>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">{doctorData?.name || 'N/A'}</h2>
            <p className="text-gray-500">{doctorData?.email || 'N/A'}</p>
            <p className="text-lg text-indigo-600 mt-2">{doctorData?.speciality || 'N/A'}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-12">
          <div className="p-6 bg-gray-50 shadow-xl rounded-lg">
            <p><strong>Degree:</strong> {doctorData?.degree || 'N/A'}</p>
            <p><strong>Experience:</strong> {doctorData?.experience || 'N/A'}</p>
            <p className="mt-4"><strong>About:</strong> {doctorData?.about || 'No details available'}</p>
          </div>

          <div className="p-6 bg-gray-50 shadow-xl rounded-lg">
            <p><strong>Fees:</strong> ₹{doctorData?.fees || 'N/A'}</p>
            <p className="mt-2">
              <strong>Availability:</strong> 
              <span className={`ml-2 px-3 py-1 rounded-full text-white ${doctorData?.available ? 'bg-green-500' : 'bg-red-500'}`}>
                {doctorData?.available ? 'Available' : 'Not Available'}
              </span>
            </p>
            <p className="mt-2">
              <strong>Address:</strong> {doctorData?.address?.line1 || 'N/A'}, {doctorData?.address?.line2 || 'N/A'}
            </p>
          </div>
        </div>
          
        <div className="p-8 bg-gray-100 rounded-b-3xl">
          <p><strong>Joined on:</strong> {doctorData?.date ? new Date(doctorData.date).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
