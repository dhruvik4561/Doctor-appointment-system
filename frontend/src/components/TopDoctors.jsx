import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext);

  const availableDoctors = doctors.filter((doc) => doc.isAvailable === true);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-4xl font-medium text-blue-600 font-bold'>Top Doctors</h1>
      <p className='sm:w-1/3 text-center text-md'>Simply browse through our extensive list of trusted doctors</p>

      <div className='w-full flex flex-wrap justify-center gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {availableDoctors.slice(0, 10).map((item, index) => (
          <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0);}}
            className='w-full sm:w-[48%] md:w-[32%] lg:w-[22%] border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            key={index}>
            <img className='w-full h-80 object-cover bg-blue-50' src={item.image} alt="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p>Available</p>
              </div>
              <p className='text-grey-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => { navigate('/doctors'); scrollTo(0, 0); }} className='font-bold px-12 py-3 rounded-full mt-10 hover:scale-115 transition-all duration-300 text-lg bg-blue-600 text-white'>
        More
      </button>
    </div>
  );
}

export default TopDoctors