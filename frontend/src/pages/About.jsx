import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-10">
      <div className="text-center text-3xl font-semibold text-gray-700 pb-10">
        <p>ABOUT <span className="text-blue-600">US</span></p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <img className="w-full md:max-w-[400px] rounded-lg shadow-lg" src={assets.about_image} alt="About Us" />
        <div className="flex flex-col justify-center gap-6 md:w-3/5 text-base text-gray-700">
          <p>We provide a seamless and efficient online hospital appointment system, ensuring that patients receive timely medical care without long wait times.</p>
          <p>Our platform connects you with qualified healthcare professionals, allowing you to book, manage, and track appointments with ease. With a commitment to quality and convenience, we aim to simplify healthcare accessibility.</p>
          <b className="text-gray-800 text-lg">Our Vision</b>
          <p>We strive to revolutionize healthcare accessibility by offering a user-friendly appointment system that reduces waiting times, enhances patient-doctor communication, and ensures a smooth healthcare journey.</p>
        </div>
      </div>
  
      {/* Why Choose Us Section */}
      <div className="text-center text-2xl font-semibold text-gray-700 mt-16">
        <p>WHY <span className="text-blue-600">CHOOSE US</span></p>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="border px-8 py-10 flex flex-col gap-4 text-gray-700 bg-gray-100 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer text-center">
          <b className="text-lg">EFFICIENCY</b>
          <p>Book and manage appointments effortlessly with our streamlined system.</p>
        </div>
  
        <div className="border px-8 py-10 flex flex-col gap-4 text-gray-700 bg-gray-100 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer text-center">
          <b className="text-lg">CONVENIENCE</b>
          <p>Access a wide network of trusted doctors and healthcare facilities.</p>
        </div>
  
        <div className="border px-8 py-10 flex flex-col gap-4 text-gray-700 bg-gray-100 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer text-center">
          <b className="text-lg">PERSONALIZATION</b>
          <p>Receive tailored reminders and healthcare suggestions based on your needs.</p>
        </div>
      </div>
    </div>
  );
  
}

export default About