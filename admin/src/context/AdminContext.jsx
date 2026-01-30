import React from 'react'
import axios from "axios"
import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify"

export const AdminContext = createContext()

const AdminContextProvider = ({children}) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken') || '')
    const [doctors,setDoctors] = useState([])
    const [email, setEmail] = useState('');
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors',{},{withCredentials:true})
            console.log("Full api response")
            if(data.success){
                setDoctors(data.doctors)
                console.log("updated state",data.doctors)  
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }   

    const changeAvailability = async(docId) => {
        try {
            const {data}  = await axios.post(backendUrl + '/api/admin/change-availability',{docId})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(() => {
        console.log("Doctors state updated:", doctors);
    }, [doctors]);


    const value = {
        aToken,setAToken,
        backendUrl,doctors,
        getAllDoctors,changeAvailability,email,setEmail
    }
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider