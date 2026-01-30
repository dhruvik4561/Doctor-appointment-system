import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PatientInfo = () => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        name: "",
        gender: "",
        email: "",
        age: "",
        phone: "",
        disease: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "age" && value < 0) {
            toast.error("Age cannot be negative!");
            return;
        }
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5001/api/patients/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patient),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Patient information saved successfully!");
                setPatient({ name: "", gender: "", email: "", age: "", phone: "", disease: "", description: "" });
            } else {
                toast.error(data.error || "Something went wrong!");
            }
        } catch (error) {
            toast.error("Server error. Please try again later.");
        }

    };

    useEffect(() => {
        if (!patient.phone) return;
        const checkPatientExists = async () => {
            const response = await fetch(`http://localhost:5001/api/patients/check/${patient.phone}`);
            const data = await response.json();

            if (!data.exists) {
                toast.info("Please fill the patient form first.");
                navigate("/patient-info");
            }
        };
        checkPatientExists();
    }, [patient.phone]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-700 p-4 ">

            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 border-rounded">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                        Patient Information
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input type="text" name="name" placeholder="Full Name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" onChange={handleChange} />


                        <select name="gender" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" onChange={handleChange} >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <input type="email" name="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" onChange={handleChange} />

                        <input type="number" name="age" placeholder="Age" value={patient.age} onChange={handleChange} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input type="text" name="phone" placeholder="Phone Number" value={patient.phone} onChange={handleChange} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input type="text" name="disease" placeholder="Disease Type" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" onChange={handleChange} />

                        <textarea name="description" placeholder="Brief about disease (max 200 words)" maxLength="200" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" onChange={handleChange} ></textarea>

                        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;
