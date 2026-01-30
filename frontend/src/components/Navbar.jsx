import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false)


    const logout = () => {
        setIsLoggedIn(false);
        navigate('/')
        console.log('Logged out')
    }
    return (
        <div className='h-24 flex items-center justify-between text-sm py-4 mb-3 shadow-md px-6 md:px-12 bg-white'>
            <img onClick={() => navigate('/')} className='w-32 pt-2 cursor-pointer transition-transform hover:scale-105 duration-300' src={assets.logo} alt="logo" />

            <ul className=' md:flex items-start gap-10 font-medium hidden'>
                <NavLink to='/' className="group">
                    <li className='py-2 cursor-pointer transition duration-300 font-bold text-gray-700 hover:text-blue-600 hover:scale-110'>HOME</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-500 w-0 m-auto transition-all duration-300 group-hover:w-full" />
                </NavLink>
                <NavLink to='/doctors' className="group">
                    <li className='py-2 cursor-pointer transition duration-300 font-bold text-gray-700 hover:text-blue-600 hover:scale-110'>ALL DOCTORS</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-500 w-0 m-auto transition-all duration-300 group-hover:w-full" />
                </NavLink>
                <NavLink to='/about' className="group">
                    <li className='py-2 cursor-pointer transition duration-300 font-bold text-gray-700 hover:text-blue-600 hover:scale-110'>ABOUT</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-500 w-0 m-auto transition-all duration-300 group-hover:w-full" />
                </NavLink>
                <NavLink to='/contact' className="group">
                    <li className='py-2 cursor-pointer transition duration-300 font-bold text-gray-700 hover:text-blue-600 hover:scale-110'>CONTACT</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-500 w-0 m-auto transition-all duration-300 group-hover:w-full" />
                </NavLink>
                <NavLink to='/patient-info' className="group">
                    <li className='py-2 cursor-pointer transition duration-300 font-bold text-gray-700 hover:text-blue-600 hover:scale-110'>PATIENT-INFO</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-500 w-0 m-auto transition-all duration-300 group-hover:w-full" />
                </NavLink>
            </ul>
            <div className='flex items-center gap-2'>
                {
                    isLoggedIn
                        ? (<div className='flex items-center gap-2 cursor-pointer group relative pr-10'>
                            <img className='w-9 h-9 rounded-full border-2 border-blue-500' src={assets.profile_pic} alt="" />
                            <img className='w-4 transition-transform duration-300 group-hover:rotate-180' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-4'>
                                    <p onClick={() => navigate('my-profile')} className='text-gray-600 p-2 hover:text-white cursor-pointer hover:scale-110 transition-all duration-300 pl-10 hover:bg-blue-600 w-full rounded'>My Profile</p>
                                    <p onClick={() => navigate('my-appointments')} className='text-gray-600 p-2 hover:text-white cursor-pointer hover:scale-110 transition-all duration-300 pl-5 hover:bg-blue-600 w-full rounded'>My Appointments</p>
                                    <p onClick={logout} className='text-red-500 p-2 hover:text-white cursor-pointer hover:scale-110 transition-all duration-300 pl-13 hover:bg-red-600 w-full rounded'>Logout</p>
                                </div>
                            </div>
                        </div>)
                        : (<button onClick={() => navigate('/login')} className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition duration-300 shadow-md hidden md:block'>Create Account</button>
                        )}

                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

                {/* --- mobile menu ---- */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-6 mx-12 my-8' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/patient-info'><p className='px-4 py-2 rounded inline-block'>Patient-Info</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar