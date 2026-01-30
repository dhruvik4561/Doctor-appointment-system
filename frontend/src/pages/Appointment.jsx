import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'


const Appointment = () => {

  const { docId } = useParams()
  const navigate = useNavigate();
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  const [patientPhone, setPatientPhone] = useState("");
  const [isPatientRegistered, setIsPatientRegistered] = useState(false);
  const [bookResultText, setBookResultText] = useState("");


  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id == docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        // increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const handleBookAppointment = async () => {
    if (!patientPhone) {
      toast.error("Please enter your phone number before booking an appointment.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/appointments/check/${patientPhone}`);
      const data = await response.json();
      console.log("Check Patient API Response:", data);
      if (!data.exists) {
        toast.error("Patient information not found. Please fill out the Patient Info form first.");
        navigate("/patient-info");
        return;
      }

      setIsPatientRegistered(true);

      if (!slotTime || !docSlots.length || !docSlots[slotIndex]?.length) {
        toast.error("Please select a valid date and time slot.");
        return;
      }

      const appointmentData = {
        phone: patientPhone,
        doctorId: docId,
        doctorName: docInfo.name,
        date: docSlots[slotIndex][0].datetime.toISOString(),
        time: slotTime,
      };

      const bookResponse = await fetch("http://localhost:5001/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      console.log("Patient is registered, booking now...");

      const bookResultText = await bookResponse.text();
      console.log("Raw Response:", bookResultText);

      let bookResult
      try {
        bookResult = JSON.parse(bookResultText);
      } catch (err) {
        console.error("Invalid JSON response:", bookResultText);
        toast.error("Server error: Response is not in JSON format.");
        return
      }
      
      if (bookResponse.ok) {
        setBookResultText(bookResult.message);
        toast.success("Appointment booked successfully!");
      } else {
        toast.error(bookResult.error || "Error booking appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
         
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm teat-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* --- Booking slots ---- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 '>
        <p className='text-lg font-semibold text-gray-800'>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-auto mt-4 scrollbar-hide snap-x snap-mandatory'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 min-w-[60px] rounded-full cursor-pointer transition-all duration-300 shadow-sm 
                    ${slotIndex === index ? 'bg-[#5f6FFF] text-white' : 'border border-gray-300 bg-white hover:bg-gray-100'}`} key={index}>
                <p className="text-sm font-medium">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-lg font-semibold">{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <input type="text" placeholder="Enter your phone number" className="border-1 border-blue-300 p-3 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-[#5f6FFF]" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} />

        {/* Time slots selection */}
        <div className='flex items-center gap-3 w-full overflow-x-auto mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-medium flex-shrink-0 px-6 py-3 rounded-full cursor-pointer transition-all duration-300 shadow-sm 
              ${item.time === slotTime ? 'bg-[#5f6FFF] text-white scale-105' : 'text-gray-600 border border-gray-300 bg-white hover:bg-gray-100'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={handleBookAppointment} className='bg-[#5f6FFF] text-white text-base font-medium px-16 py-3 rounded-full mt-6 shadow-lg hover:bg-[#4a5bff] transition-all duration-300 '>Book an Appointment</button>
      </div>
      
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment