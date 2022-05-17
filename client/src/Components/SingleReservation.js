import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReservationServices from '../services/ReservationServices'
import '../css/SingleReservation.css'
import VehicleImages from './VehicleImages'

const SingleReservation = () => {
  const [reservation, setReservation] = useState({start: '', end: '', quantity: ''})
  const [vehicle, setVehicle] = useState({type: '', brand: '', model: '', year: '', color: '', price: '', images: []})

  const [token, setToken] = useState(localStorage.getItem('car-rental-token'))
  const { id, index } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchReservation()
  }, [])

  const fetchReservation = () => {
    ReservationServices.getSingleReservationFromCart(token, id).then(data => {
      setReservation(data.message.reservation)
      setVehicle(data.message.reservation.vehicleItem)
      console.log(data);
    })
  }

  const onChangeHandler = (e) => {
    setReservation({...reservation, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const update = {start: reservation.start, end: reservation.end, quantity: reservation.quantity};
    ReservationServices.updateReservation(token, id, update, index).then(data => {
      console.log(data);
    })
    setTimeout(() => {
      navigate('/cart', { replace: true })
    }, 1000)
  }

  return (
    <section className='single-reservation'>
      <h2>Update Reservation</h2>
      <div className='single-reservation-container'>
        <VehicleImages images={vehicle.images} key={vehicle._id} />
        <div className='reservation-vehicle-details'>
          <div className='reserved-vehicle-details'>
            <p><span>Vehicle type: </span>{vehicle.type}</p>
            <p><span>Brand: </span>{vehicle.brand}</p>
            <p><span>Model: </span>{vehicle.model}</p>
            <p><span>Year: </span>{vehicle.year}</p>
            <p><span>Color: </span>{vehicle.color}</p>
            <p><span>Price: </span>{vehicle.price}</p>
          </div>
          <hr className='horizontal-line'></hr>
          <form onSubmit={onSubmitHandler} className='reserved-info-details'>
            <div className='reserved-date'>
              <label>Start: </label>
              <input
                type='date'
                name='start'
                value={reservation.start}
                onChange={(e) => onChangeHandler(e)}
                className='reserved-date-input'
              />
              <label>End: </label>
              <input
                type='date'
                name='end'
                value={reservation.end}
                onChange={(e) => onChangeHandler(e)}
                className='reserved-date-input'
              />
            </div>
            <hr className='horizontal-line'></hr>
            <div className='reserved-vehicle-update-cart'>
              <input
                type='number'
                name='quantity'
                value={reservation.quantity}
                onChange={(e) => onChangeHandler(e)}
                className='reserved-vehicle-quantity'
              />
              <input
                type='submit'
                value='Update Reservation'
                className='reserved-update-btn'
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SingleReservation