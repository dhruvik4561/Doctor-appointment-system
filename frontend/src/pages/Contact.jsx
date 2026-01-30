import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="md:px-12 lg:px-20">
      <div className="text-center text-3xl font-semibold text-gray-700 mt-16">
        <p>CONTACT <span className="text-blue-600">US</span></p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 items-center my-10 text-base text-gray-700">
        <img className="w-full md:max-w-[400px] rounded-lg shadow-lg" src={assets.contact_image} alt="Contact Us" />
        <div className="flex flex-col justify-center gap-6 md:w-3/5">
          <p className="font-semibold text-lg">OUR OFFICE</p>
          <p className="text-gray-600">301,302 Health Avenue, City Center <br /> Conveniently located for easy access</p>
          <p className="text-gray-600"> Email: support@hospitalappointments.com</p>
          <p className="font-semibold text-lg">HOSPITAL APPOINTMENTS</p>
          <p className="text-gray-600">Connect with our dedicated support team for assistance with appointments</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">Get in Touch</button>
        </div>
      </div>
    </div>
  );
  
}

export default Contact