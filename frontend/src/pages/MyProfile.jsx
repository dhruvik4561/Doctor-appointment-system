import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {

  const { userData, setUserData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [profileImg, setProfileImg] = useState(null);


  if (!userData) {
    return <h1 className="text-center text-2xl text-red-500">Loading Profile...</h1>;
  }

  // Handle Image Change & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
    }
  };


  //Profile Update API Call
  const handleProfileUpdate = async () => {
    try {
      console.log("Updating profile...", userData);

      const userId = userData?._id || localStorage.getItem("userId");

      if (!userId || userId === "null") {
        toast.error("User ID not found!");
        console.error("Error: User ID is missing or invalid.");
        return;
      }

      const formData = new FormData();
      formData.append("userId", userData._id);
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);

      console.log("Frontend Address Data:", JSON.stringify({
        line1: userData.address?.line1 || "",
        line2: userData.address?.line2 || ""
      }));

      formData.append("address", JSON.stringify({
        line1: userData.address?.line1 || "N/A",
        line2: userData.address?.line2 || "N/A"
      }));

      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);

      if (profileImg) {
        formData.append("image", profileImg);
      }

      const response = await axios.post('http://localhost:5001/api/update-profile', formData, { headers: { "Content-Type": "multipart/form-data" }, });

      console.log("API Response:", response.data);

      if (response.data.success) {
        toast.success('Profile updated successfully');
        setUserData(prev => ({ ...prev, image: response.data.imageUrl || prev.image }));

        setProfileImg(null);
        setIsEdit(false);
      } else {
        console.error("Server Error:", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Update Profile Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  return userData && (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 shadow-2xl rounded-2xl text-sm relative text-gray-800 hover:scale-[1.01] transition-transform duration-300">

      {/* Profile Image Upload */}
      <div className="flex flex-col items-center">
        <label htmlFor="profile-img" className="cursor-pointer relative group">
          <img
            className="w-36 h-36 object-cover bg-gray-100 rounded-full border-4 border-blue-200 shadow-md group-hover:shadow-blue-300 transition duration-300"
            src={profileImg ? URL.createObjectURL(profileImg) : userData.image}
            alt="Profile"
          />
          {isEdit && (
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs rounded-full px-2 py-1 shadow">
              Change
            </div>
          )}
        </label>
        {isEdit && (
          <input type="file" id="profile-img" hidden accept="image/*" onChange={handleImageChange} />
        )}
      </div>

      {/* Name Field */}
      <div className="text-center mt-4">
        {isEdit ? (
          <input
            className="bg-white border border-gray-300 text-2xl font-medium text-center rounded-md px-3 py-2 w-2/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="font-semibold text-2xl">{userData.name}</p>
        )}
      </div>

      <hr className="border-t border-blue-200 mt-6" />

      {/* Contact Info */}
      <div className="mt-5">
        <p className="text-blue-800 font-semibold uppercase text-xs">Contact Information</p>
        <div className="mt-3 space-y-3">
          <div className="flex justify-between items-center">
            <p className="font-medium">Email:</p>
            <p className="text-blue-700">{userData.email}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-white border border-gray-300 px-2 py-1 rounded w-1/2 shadow-sm focus:ring-1 focus:ring-blue-400"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-blue-700">{userData.phone}</p>
            )}
          </div>

          <div>
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="space-y-2 mt-1">
                <input
                  className="bg-white border border-gray-300 px-2 py-1 w-full rounded shadow-sm focus:ring-1 focus:ring-blue-400"
                  value={userData.address?.line1 || ""}
                  placeholder="Address Line 1"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))
                  }
                />
                <input
                  className="bg-white border border-gray-300 px-2 py-1 w-full rounded shadow-sm focus:ring-1 focus:ring-blue-400"
                  value={userData.address?.line2 || ""}
                  placeholder="Address Line 2"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))
                  }
                />
              </div>
            ) : (
              <p className="text-gray-700 mt-1">{userData.address?.line1 || "N/A"}<br />{userData.address?.line2 || "N/A"}</p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="mt-6">
        <p className="text-blue-800 font-semibold uppercase text-xs">Basic Information</p>
        <div className="mt-3 space-y-3">
          <div className="flex justify-between items-center">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm focus:ring-1 focus:ring-blue-400"
                value={userData.gender}
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              >
                <option value="select">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm focus:ring-1 focus:ring-blue-400"
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <p className="text-gray-700">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 text-center">
        {isEdit ? (
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-lg"
            onClick={handleProfileUpdate}
          >
            Save Information
          </button>
        ) : (
          <button
            className="bg-blue-100 text-blue-800 px-6 py-2 rounded-full hover:bg-blue-200 transition-all shadow"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );

}

export default MyProfile