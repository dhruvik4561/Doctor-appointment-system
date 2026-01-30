import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import bcrypt from 'bcryptjs'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('MS')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', hashedPassword)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))


      formData.forEach((value, key) => {
        console.log(`${key}:${value}`)
      })

      const { data } = await axios.post(backendUrl + `/api/admin/add-doctor`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response data:", data);

      if (data.success) {
        toast.success("Doctor Added Successfully")
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(`Failed to add doctor: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        console.error("Request data:", error.request);
        toast.error("Failed to add doctor: No response from server.");
      } else {
        console.error("Error message:", error.message);
        toast.error(`Failed to add doctor: ${error.message}`);
      }

    }

  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-300 p-5">
      <form onSubmit={onSubmitHandler} className="m-5 w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 ">Add Doctor</h2>

        <div className="flex flex-col items-center mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img className="w-25 h-25 object-cover bg-gray-200 rounded-full border" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-gray-500 mt-2">Upload Doctor Picture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-600 ">Doctor Name</label>
            <input type="text" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Doctor Email</label>
            <input type="email" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Doctor Password</label>
            <input type="password" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Experience</label>
            <select className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={experience} onChange={(e) => setExperience(e.target.value)}>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Fees</label>
            <input type="number" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={fees} onChange={(e) => setFees(e.target.value)} required />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Speciality</label>
            <select className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
              {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec, i) => (
                <option key={i} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Education</label>
            <select className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={degree} onChange={(e) => setDegree(e.target.value)}>
              {["MS", "MD", "MBBS"].map((deg, i) => (
                <option key={i} value={deg}>{deg}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Address</label>
            <input type="text" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all" value={address1} onChange={(e) => setAddress1(e.target.value)} required placeholder="Address 1" />
            <input type="text" className="border p-2 rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all" value={address2} onChange={(e) => setAddress2(e.target.value)} required placeholder="Address 2" />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-gray-600">About Doctor</label>
          <textarea className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all" rows={4} value={about} onChange={(e) => setAbout(e.target.value)} required placeholder="Write about doctor" />
        </div>

        <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Add Doctor</button>
      </form>
    </div>
  );
}

export default AddDoctor