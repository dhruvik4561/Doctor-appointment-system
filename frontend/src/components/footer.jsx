import React from 'react'
import { assets } from '../assets/assets'

const footer = () => {

    return (
        <div className="mt-16 py-10 border-t border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700 text-sm">
                {/* Left Section */}
                <div>
                    <img className="mb-4 w-32" src={assets.logo} alt="Hospital Logo" />
                    <p className="leading-6">Providing seamless healthcare appointment services to ensure timely and effective patient care.</p>
                </div>

                {/* Center Section */}
                <div>
                    <p className="text-lg font-medium mb-3">Company</p>
                    <ul className="flex flex-col gap-2">
                        <li className="hover:text-blue-600 cursor-pointer">Home</li>
                        <li className="hover:text-blue-600 cursor-pointer">About Us</li>
                        <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
                        <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <p className="text-lg font-medium mb-3">Get in Touch</p>
                    <ul className="flex flex-col gap-2">
                        <li className="hover:text-blue-600 cursor-pointer">+1 234 567 890</li>
                        <li className="hover:text-blue-600 cursor-pointer">support@hospitalappointments.com</li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 text-sm mt-8">
                <hr className="mb-4" />
                <p>© 2025 Hospital Appointments - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default footer