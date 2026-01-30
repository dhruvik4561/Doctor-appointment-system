import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Login = () => {

  const { backendUrl, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          toast.success('Account created successfully')
          setIsLoggedIn(true);
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })
        if (data.success) {
          toast.success('Login successfully!!')
          setIsLoggedIn(true);
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-500 px-4">
      <div className="flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden shadow-xl w-full max-w-4xl">
        <div className="hidden md:block md:w-1/2">
          <img src={assets.login_back} alt="Login Visual" className="h-full w-full object-cover" />
        </div>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 p-8 w-full md:w-1/2 bg-white text-gray-700">
          <p className="text-3xl font-bold text-center text-purple-700">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </p>
          <p className="text-center text-gray-500 mb-2">
            Please {state === "Sign Up" ? "sign up" : "log in"} to book an appointment
          </p>

          {state === "Sign Up" && (
            <div className="w-full">
              <p className="font-medium">Full Name</p>
              <input className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400" type="text" onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
          )}

          <div className="w-full">
            <p className="font-medium">Email</p>
            <input className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>

          {/* Password Field */}
          <div className="w-full">
            <p className="font-medium">Password</p>
            <input
              className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white w-full py-3 rounded-lg text-lg font-medium transition-all duration-300"
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>

          {/* Switch Login/Signup */}
          {state === "Sign Up" ? (
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-purple-600 font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-purple-600 font-medium cursor-pointer hover:underline"
              >
                Sign up here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );


}

export default Login