import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap rounded px-6 md:px-10 lg:px-20 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600'>
            
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl text-white md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Book Appointment <br /> with Trusted Doctors
                </p>
                <div className='flex flex-col md:flex-row text-white items-center gap-3 text-sm font-light'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>Explore top specialists across various medical fields<br className='hidden sm:block' />to get the best care for your needs</p>
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-grey-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                    Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-5 h-auto rounded-lg' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header