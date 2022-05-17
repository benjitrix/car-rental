import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VehicleServices from '../services/VehicleServices'
import '../css/LogoutUser.css'
import { useGlobalContext } from '../context/Context'

const LogoutUser = () => {
  // const [token, setToken] = useState(true)
  const navigate = useNavigate()
  const { token, setToken } = useGlobalContext()

  useEffect(() => {
    if (localStorage.getItem('car-rental-token') === null) {
      VehicleServices.getAllVehicles().then(data => {
        console.log(data);
      })
    }
  }, [token])

  const logout = () => {
    localStorage.removeItem('car-rental-token')
    setToken(false)
    navigate('/', { replace: true})
  }

  return (
    <section className='logout-user'>
      <h2>Logout</h2>
      <div className='logout-user-container'>
        <p>Logout from app?</p>
        <button 
          onClick={() => logout()}
          className='logout-btn'
          >
          logout
        </button>
      </div>
    </section>
  )
}

export default LogoutUser