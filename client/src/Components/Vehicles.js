import React, { useState, useEffect } from 'react'
import VehicleServices from '../services/VehicleServices'
import Vehicle from './Vehicle'
import '../css/Vehicles.css'

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    VehicleServices.getAllVehicles().then(data => {
      setVehicles(data.message.vehicles)
      console.log(data);
    })
  }, [])

  return (
    <section className='vehicles'>
      <div className='vehicles-container'>
        {
          vehicles.map((vehicle, index) => {
            return (
              <Vehicle key={index} {...vehicle} />
            )
          })
        }
      </div>
    </section>
  )
}

export default Vehicles