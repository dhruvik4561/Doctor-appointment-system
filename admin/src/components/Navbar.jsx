import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { email: adminEmail, setEmail: setAdminEmail } = useContext(AdminContext);
  const { email: doctorEmail, setEmail: setDoctorEmail } = useContext(DoctorContext);
  const navigate = useNavigate()

  const logout = () => {
    if (adminEmail) {
      setAdminEmail('');
      localStorage.removeItem('adminEmail');
      navigate('/');
    } else if (doctorEmail) {
      setDoctorEmail('');
      localStorage.removeItem('doctorEmail');
      navigate('/');
    }
  };

  return (
    <div className='h-25 flex justify-between items-center px-4 sm:px-10 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg py-4 '>
      <div className='flex items-center gap-4'>
        <img className='w-24 cursor-pointer' src={assets.admin_logo} alt="Admin Logo" />
        <span className={`text-sm font-semibold px-4 py-1 rounded-full text-white ${adminEmail ? 'bg-green-500' : 'bg-yellow-500'}`}>
          {adminEmail ? 'Admin' : doctorEmail ? 'Doctor' : 'Guest'}
        </span>
      </div>
      <button onClick={logout} className='bg-white text-blue-600 hover:bg-blue-100 font-semibold text-sm px-8 py-2 rounded-full shadow-md transition duration-300'>
        Logout
      </button>
    </div>
  )
}

export default Navbar
