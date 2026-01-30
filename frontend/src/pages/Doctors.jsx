import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="px-4">
      <p className="text-gray-700 text-2xl font-semibold">
        Browse through the doctors specialist
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-6 mt-6">
        <button
          className={`py-2 px-4 rounded-lg text-sm font-medium transition-all sm:hidden ${showFilter ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div className={`flex flex-col gap-4 text-sm text-gray-700 ${showFilter ? "flex" : "hidden sm:flex"}`}>

          {/* general physician */}
          <p onClick={() => speciality === "General physician" ? navigate("/doctors") : navigate("/doctors/General physician")}
            className={`flex items-center px-4 py-2 border-b-2 rounded cursor-pointer transition-all ${speciality === "General physician"
              ? "bg-blue-600 text-white scale-110 transition-all duration-300"
              : "hover:bg-gray-100 hover:scale-110 transition-all duration-200"
              }`}
          >
            <img className="w-6 h-6 mr-3 hover:scale-110 transition-all duration-300" src={assets.stethoscope1} alt="Icon" />
            <span className="whitespace-nowrap text-base font-medium">General physician</span>
          </p>

          {/* Gynecologist */}
          <p onClick={() => speciality === "Gynecologist" ? navigate("/doctors") : navigate("/doctors/Gynecologist")}
            className={`flex items-center px-4 py-2 border-b-2 rounded-lg cursor-pointer transition-all ${speciality === "Gynecologist"
              ? "bg-blue-600 text-white scale-110 transition-all duration-300"
              : "hover:bg-gray-200 hover:scale-110 transition-all duration-200"
              }`}
          >
            <img className="w-6 h-6 mr-3" src={assets.Gynecologist1} alt="Icon" />
            <span className="whitespace-nowrap text-base font-medium">Gynecologist</span>
          </p>

          {/* Dermatologist */}
          <p onClick={() => speciality === "Dermatologist" ? navigate("/doctors") : navigate("/doctors/Dermatologist")}
            className={`flex items-center px-4 py-2 border-b-2 rounded-lg cursor-pointer transition-all ${speciality === "Dermatologist"
              ? "bg-blue-600 text-white scale-110 transition-all duration-300"
              : "hover:bg-gray-200 hover:scale-110 transition-all duration-200"
              }`}
          >
            <img className="w-6 h-6 mr-3 hover:scale-110 transition-all duration-300" src={assets.dermatology1} alt="Icon" />
            <span className="whitespace-nowrap text-base font-medium">Dermatologist</span>
          </p>

          {/* Pediatricians */}
          <p onClick={() => speciality === "Pediatricians" ? navigate("/doctors") : navigate("/doctors/Pediatricians")}
            className={`flex items-center px-4 py-2 border-b-2 rounded-lg cursor-pointer transition-all ${speciality === "Pediatricians"
              ? "bg-blue-600 text-white scale-110 transition-all duration-300"
              : "hover:bg-gray-200 hover:scale-110 transition-all duration-200"
              }`}
          >
            <img className="w-6 h-6 mr-3 hover:scale-110 transition-all duration-300" src={assets.pediatricians1} alt="Icon" />
            <span className="whitespace-nowrap text-base font-medium">Pediatricians</span>
          </p>

          {/* neorologist  */}
          <p onClick={() => speciality === "Neurologist" ? navigate("/doctors") : navigate("/doctors/Neurologist")
          }
            className={`flex items-center px-4 py-2 border-b-2 rounded-lg cursor-pointer transition-all ${speciality === "Neurologist"
              ? "bg-blue-600 text-white scale-110 transition-all duration-300"
              : "hover:bg-gray-200 hover:scale-110 transition-all duration-200"
              }`}
          >
            <img className="w-6 h-6 mr-3 hover:scale-110 transition-all duration-300" src={assets.neurology1} alt="Icon" />
            <span className="whitespace-nowrap text-base font-medium"> Neurologist</span>
          </p>

          {/* Gastroenterologist */}
          <p onClick={() => speciality === "Gastroenterologist" ? navigate("/doctors") : navigate("/doctors/Gastroenterologist")
          }
            className={`w-52 flex items-center justify-start px-4 py-2 border-b-2 rounded-lg cursor-pointer transition-all ${speciality === "Gastroenterologist"
              ? "bg-blue-600 text-white scale-110 transition-all duration-300"
              : "hover:bg-gray-200 hover:scale-110 transition-all duration-200"
              }`}
          >
            <img className="w-6 h-6 mr-3 hover:scale-110 transition-all duration-300" src={assets.gastroenterologist1} alt="Icon" />
            <span className="whitespace-nowrap text-base font-medium">Gastroenterologist</span>
          </p>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-300 rounded-xl overflow-hidden cursor-pointer transform transition-transform hover:-translate-y-2 shadow-sm hover:shadow-lg"
            >
              <img className="w-full h-45 object-cover bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-semibold">{item.name}</p>
                <p className="text-gray-700 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default Doctors