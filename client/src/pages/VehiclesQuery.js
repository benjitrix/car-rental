import React from 'react'
import Vehicles from '../Components/Vehicles'
import Query from '../Components/Query'
import Advert from '../Components/Advert'
import '../css/VehicleQuery.css'

const VehiclesQuery = () => {
  return (
    <section className='vehicle-query'>
      <Advert />
      <div className='vehicle-query-container'>
        <Query />
        <Vehicles />
      </div>
    </section>
  )
}

export default VehiclesQuery