import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {

    const [doctorData, setDoctorData] = useState(null);
    const [email, setEmail] = useState(()=>localStorage.getItem('doctorEmail') || '');
    const backendUrl = 'http://localhost:5001';
    const navigate = useNavigate();

    const fetchDoctorData = async () => {
        if (!email) {
            return;
        }
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/profile?email=${encodeURIComponent(email)}`);
            if (data.success) {
                console.log('Doctor Data:', data.doctor); 
                setDoctorData(data.doctor);
            } else {
                console.error('Error:', data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Failed to fetch doctor data:', error.response.data.message);
        }
    };

    // useEffect(() => {
    //     console.log("Doctor Email:", email);
    //     if (email) {
    //         fetchDoctorData();
    //         navigate('login');
    //     }
    // }, [email]);

    useEffect(() => {
        console.log("Doctor Email:", email);
        if (email) {
          fetchDoctorData();
        } else {
          navigate('/login');
        }
      }, [email]);


    const logoutDoctor = () => {
        setDoctorData(null);
        setEmail('')
        localStorage.removeItem('doctorEmail');
        navigate('/login');
        toast.success('Logged out successfully');
    };

    return (
        <DoctorContext.Provider value={{ doctorData, setDoctorData,logoutDoctor, setEmail, email, fetchDoctorData }}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorProvider;
