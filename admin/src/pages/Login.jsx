import React, { useRef, useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Login = () => {

    const [state, setState] = useState('Admin')
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const { setEmail: setAdminEmail } = useContext(AdminContext);
    const { setEmail: setDoctorEmail } = useContext(DoctorContext);
    const navigate = useNavigate();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            const endpoint = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
            const { data } = await axios.post(`http://localhost:5001${endpoint}`, { email, password });
            if (data.success) {
                if (state === 'Admin') {
                    setAdminEmail(email);
                    console.log("Navigating to admin dashboard");
                    localStorage.setItem("adminEmail", email);
                    navigate('/admin-dashboard');
                    console.log('Admin Login Successful!');
                } else {
                    setDoctorEmail(email);
                    console.log("Navigating to doctor dashboard");
                    localStorage.setItem("doctorEmail", email);
                    navigate('/doctor-dashboard');
                }
                toast.success('Login successful!');
                emailRef.current.value = '';
                passwordRef.current.value = '';
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-500">
            <div className="flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden shadow-xl w-full max-w-4xl animate-fade-in">

                <div className="hidden sm:block sm:w-1/2">
                    <img src={assets.doctor_back} alt="Hospital Visual"
                        className="h-full w-full object-cover" />
                </div>

                <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex flex-col gap-4 p-8 text-[#5E5E5E] animate-slide-in" >
                    <div className="flex justify-center mb-2">
                        <img
                            src={
                                state === "Admin"
                                    ? "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                                    : "https://cdn-icons-png.flaticon.com/512/3774/3774299.png" 
                            }
                            alt={`${state} Logo`}
                            className="w-16 h-16"
                        />
                    </div>

                    <p className="text-3xl font-semibold text-center">
                        <span className="text-[#5f6FFF]">{state}</span> Login
                    </p>

                    <div className="w-full">
                        <p>Email</p>
                        <input ref={emailRef} type="email" required className="border border-[#DADADA] rounded w-full p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    </div>

                    <div className="w-full">
                        <p>Password</p>
                        <input ref={passwordRef} type="password" required className="border border-[#DADADA] rounded w-full p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    </div>

                    <button className="bg-[#5f6FFF] hover:bg-indigo-700 text-white w-full py-3 rounded-md text-base font-medium transition duration-300">
                        Login
                    </button>

                    {state === "Admin" ? (
                        <p className="text-center text-sm">
                            Doctor Login?{" "}
                            <span
                                className="text-[#5f6FFF] underline cursor-pointer"
                                onClick={() => setState("Doctor")}
                            >
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p className="text-center text-sm">
                            Admin Login?{" "}
                            <span
                                className="text-[#5f6FFF] underline cursor-pointer"
                                onClick={() => setState("Admin")}
                            >
                                Click here
                            </span>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );

}

export default Login