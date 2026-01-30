import React, { useState, useEffect } from 'react';
import { createContext } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true;
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
  
    const [isLoggedIn, setIsLoggedIn] = useState(()=>{
        return localStorage.getItem('isLoggedIn') === 'false';
    })

    const [userData , setUserData] = useState(null) 


    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
                console.log("Fetched doctors:", data.doctors);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async() => {
        if (!backendUrl) return;

        try {
            console.log("Making API call to:", backendUrl + '/api/user/get-profile');

            const {data} = await axios.get(backendUrl + '/api/user/get-profile');
            if(data.success){
                setUserData(data.userData)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error fetching user profile:", error);
            toast.error(error.message || "An error occurred")
        }
    }

    const value = {
        doctors,
        currencySymbol,
        backendUrl,isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        loadUserProfileData
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(()=>{
        if(isLoggedIn){
            loadUserProfileData();
        } else{
            setUserData(null);
        }
    },[isLoggedIn]);

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    return (
        < AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider >
    );
};

export default AppContextProvider