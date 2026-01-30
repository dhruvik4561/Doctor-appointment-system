import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'


const Sidebar = () => {

    const { email: adminEmail } = useContext(AdminContext);
    const { email: doctorEmail } = useContext(DoctorContext);

    return (
        <div className='flex h-screen bg-gradient-to-b from-blue-500 to-indigo-600 text-white shadow-lg'>
            <div className='h-full w-20 md:w-72 bg-white text-blue-500 bg-gradient-to-b from-blue-500 to-indigo-600 text-white shadow-lg '>
                {
                    adminEmail && <ul className='text=[#515151] mt-6 space-y-2'>

                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-blue-600' : ''}`} to={'/admin-dashboard'}>
                            <img className="w-6 h-6 transition-transform transform hover:scale-110" src={assets.home_icon} alt="" />
                            <p>Dashboard</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-blue-600' : ''}`} to={'/all-appointments'}>
                            <img className="w-6 h-6 transition-transform transform hover:scale-110" src={assets.appointment_icon} alt="" />
                            <p>Appointments</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-blue-600' : ''}`} to={'/add-doctor'}>
                            <img className="w-6 h-6 transition-transform transform hover:scale-110" src={assets.add_icon} alt="" />
                            <p>Add Doctor</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-blue-600' : ''}`} to={'/doctor-list'}>
                            <img className="w-6 h-6 transition-transform transform hover:scale-110" src={assets.people_icon} alt="" />
                            <p>Doctors List</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-blue-600' : ''}`} to={'/delete-doctor'}>
                            <img className="w-6 h-6 transition-transform transform hover:scale-110" src={assets.delete_icon} alt="" />
                            <p>Delete Doctor</p>
                        </NavLink>
                    </ul>
                }
                {doctorEmail && (
                    <ul className='text-white mt-6 space-y-2'>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-blue-600' : ''}`} to={'/doctor-profile'}>
                            <img className="w-6 h-6 transition-transform transform hover:scale-110" src={assets.people_icon} alt="" />
                            <p>My Profile</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-blue-600' : ''}`} to={'/my-appointment'}>
                            <img className="w-6 h-6 transition-transform transform hover:scale-110" src={assets.appointment_icon} alt="" />
                            <p>My Appointments</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-blue-600' : ''}`} to={'/doctor-dashboard'}>
                            <img className="w-6 h-6 transition-transform transform hover:scale-110" src={assets.home_icon} alt="" />
                            <p>Dashboard</p>
                        </NavLink>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Sidebar