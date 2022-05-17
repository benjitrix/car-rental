import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import VehicleServices from '../services/VehicleServices'
import VehicleImages from './VehicleImages'
import { FaBars, FaShoppingCart } from 'react-icons/fa'
import { useGlobalContext } from '../context/Context'
import Advert from './Advert'
import '../css/SingleVehicle.css'
import ReservationServices from '../services/ReservationServices'

const SingleVehicle = () => {
  const [vehicle, setVehicle] = useState({type: '', brand: '', model: '', year: '', color: '', price: '', images: []})
  const [showMenu, setShowMenu] = useState(false)
  const [reservation, setReservation] = useState()

  const { id } = useParams()
  const { user, token } = useGlobalContext()

  useEffect(() => {
    fetchVehicle()
  }, [])

  const fetchVehicle = () => {
    VehicleServices.getVehicle(id).then(data => {
      setVehicle(data.message.vehicle)
      console.log(data);
    })
  }

  const onChangeHandler = (e) => {
    setReservation({...reservation, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(reservation);
    ReservationServices.addReservationToCart(token, id, reservation).then(data => {
      console.log(data)
    })
  }
  return (
    <section className='single-vehicle'>
      <Advert />
      <div className='single-vehicle-container'>
        <VehicleImages images={vehicle.images} key={id} />
        <div className='single-vehicle-info'>
          <div className='single-vehicle-details'>
            <p><span>Vehicle-type: </span>{vehicle.type}</p>
            <p><span>Brand: </span>{vehicle.brand}</p>
            <p><span>Model: </span>{vehicle.model}</p>
            <p><span>Year: </span>{vehicle.year}</p>
            <p><span>Color: </span>{vehicle.color}</p>
            <p><span>Price: </span>${vehicle.price}</p>
          </div>
          <hr className='single-horizontal-line'></hr>
          <form onSubmit={onSubmitHandler} 
          className='single-vehicle-reservation-add-to-cart'>
            <div className='single-vehicle-reservation-date'>
              <label>Start: </label>
              <input
                type='date'
                name='start'
                onChange={(e) => onChangeHandler(e)}
                className='single-vehicle-date'
              />
              <label>End: </label>
              <input
                type='date'
                name='end'
                onChange={(e) => onChangeHandler(e)}
                className='single-vehicle-date'
              />
            </div>
            <hr className='single-horizontal-line'></hr>
            <div className='single-vehicle-qty-add-to-cart'>
              <div className='single-vehicle-add-to-cart-input'>
                <input 
                  type='number'
                  name='number'
                  onChange={(e) => onChangeHandler(e)}
                  className='single-vehicle-input'
                />
                <input
                  type='submit'
                  value={'Add-to-Cart'}
                  className='single-vehicle-add-to-cart-btn'
                />
              </div>
              <Link
                to='/cart'
                className='single-vehicle-cart-link'
                >
                <FaShoppingCart />
              </Link>
            </div>
          </form>
        </div>
        <FaBars className='dropdown-menu-bars' onMouseEnter={() => setShowMenu(true)} onMouseOut={() => setShowMenu(false)} />
        <div className={`dropdown-menu ${showMenu ? 'open-menu' : ''}`}> 
          { user.role === 'admin' && 
            <Link
              to={`/update-vehicle/${id}`}
              className='dropdown-link'
              >
              update
            </Link>
          }
          { user.role === 'admin' && 
            <Link
              to={`/delete-vehicle/${id}`}
              className='dropdown-link'
              >
              delete
            </Link>
          }
        </div>
      </div>
    </section>
  )
}

export default SingleVehicle