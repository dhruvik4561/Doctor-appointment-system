import React, { useContext } from 'react'
import Login from '/src/pages/Login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import AllAppointments from './pages/admin/AllAppointments';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorsList from './pages/admin/DoctorsList';
import DeleteDoctor from './pages/admin/DeleteDoctor';
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import MyAppointment from './pages/Doctor/MyAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const { email: adminEmail } = useContext(AdminContext);
  const { email: doctorEmail } = useContext(DoctorContext);
  console.log('Admin Email:', adminEmail);
  console.log('Doctor Email:', doctorEmail);

  return (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      {adminEmail || doctorEmail ? (
        <>
          <Navbar />
          <div className='flex items-start'>
            <Sidebar />
            <Routes>
              {adminEmail ? (
                <>
                  <Route path='/admin-dashboard' element={<Dashboard />} />
                  <Route path='/all-appointments' element={<AllAppointments />} />
                  <Route path='/add-doctor' element={<AddDoctor />} />
                  <Route path='/doctor-list' element={<DoctorsList />} />
                  <Route path='/delete-doctor' element={<DeleteDoctor />} />
                  <Route path='*' element={<Navigate to='/admin-dashboard' />} />
                </>
              ) : doctorEmail ? (
                <>
                  <Route path='/doctor-profile' element={<DoctorProfile />} />
                  <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                  <Route path='/my-appointment' element={<MyAppointment />} />
                  <Route path='*' element={<Navigate to='/doctor-dashboard' />} />
                </>
              ) : (
                <Route path='*' element={<Login />} />
              )}
            </Routes>
          </div>
        </>
      ) : (
        <>
          <Login />
          <DoctorContext />
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default App