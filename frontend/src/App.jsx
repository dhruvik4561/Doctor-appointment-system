import React from 'react'
import { BrowserRouter, Route, Routes ,useLocation  } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import PatientInfo from './pages/PatientInfo'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const location = useLocation();
  const hideLayout = location.pathname === '/login';
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      {hideLayout ? null : <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/patient-info' element={<PatientInfo />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>
      {hideLayout ? null : <Footer />}
    </div>
  )
}

export default App;