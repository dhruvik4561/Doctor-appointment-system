import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteDoctor = () => {
    const [doctorId, setDoctorId] = useState('');

    const backendUrl = 'http://localhost:5001'; 

    const deleteDoctorHandler = async () => {
        if (!doctorId) {
            return toast.error('Please enter a valid doctor ID');
        }

        try {
            const { data } = await axios.delete(`${backendUrl}/api/admin/delete-doctor/${doctorId}`,{withCredentials:true});

            if (data.success) {
                toast.success('Doctor deleted successfully');
                setDoctorId('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong!');
        }
    };

    return (
        <div className='m-5 w-full flex flex-col items-center justify-center '>
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 ">Delete Doctor</h2>
            <div className='flex flex-col justify-center bg-white px-8 py-8 rounded w-full max-w-4xl'>
                <input onChange={(e) => setDoctorId(e.target.value)} value={doctorId} type="text"
                    placeholder='Enter Doctor ID' className='w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition' required />
                <button onClick={deleteDoctorHandler} className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 mt-4 rounded-lg transition font-semibold'>
                    Delete Doctor
                </button>
            </div>
        </div>
    );
};

export default DeleteDoctor;
