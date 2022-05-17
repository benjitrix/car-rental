import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import VehicleImages from './VehicleImages'
import { FaBars, FaShoppingCart } from 'react-icons/fa'
import { useGlobalContext } from '../context/Context'
import ReservationServices from '../services/ReservationServices'
import '../css/Vehicle.css'

const Vehicle = (vehicle) => {
  const { _id, type, brand, model, year, color, price, images } = vehicle
  const [reservation, setReservation] = useState()
  const [showMenu, setShowMenu] = useState(false)
  const { user, token } = useGlobalContext()

  const onChangeHandler = (e) => {
    setReservation({...reservation, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    console.log(reservation);
    ReservationServices.addReservationToCart(token, _id, reservation).then(data => {
      console.log(data)
    })
  }

  return (
    <section className='vehicle'>
      <div className='vehicle-container'>
        <VehicleImages images={images} key={_id} className='images-container' />
        <div className='details-add-to-cart'>
          <div className='vehicle-details'>
            <p><span>Vehicle type: </span><span>{type}</span></p>
            <p><span>Brand: </span>{brand}</p>
            <p><span>Model: </span>{model}</p>
            <p><span>Year: </span>{year}</p>
            <p><span>Color: </span>{color}</p>
            <p><span>Price: </span>${price}</p>
          </div>
          <hr className='horizontal-line'></hr>
          <form onSubmit={onSubmitHandler} className='add-to-cart'>
            <div className='reservation-date'>
              <label>Start: </label>
              <input
                type='date'
                name='start'
                onChange={(e) => onChangeHandler(e)}
                className='reservation-date-input'
              />
              <label>End: </label>
              <input
                type='date'
                name='end'
                onChange={(e) => onChangeHandler(e)}
                className='reservation-date-input'
              />
            </div>
            <hr className='horizontal-line'></hr>
            <div className='qty-add-to-cart'>
              <div className='add-to-cart-input'>
                <input
                  type="number"
                  name="quantity"
                  onChange={(e) => onChangeHandler(e)}
                  className="select-vehicle-number"
                />
                <input
                  type='submit'
                  value="Add-to-Cart"
                  className='add-vehicle-to-cart-btn'
                />
              </div>
              <Link 
                to='/cart'
                className='vehicle-cart-link'
                >
                <FaShoppingCart />
              </Link>
            </div>
          </form>
        </div>
        <FaBars className='dropdown-menu-bars' onMouseEnter={() => setShowMenu(true)} onMouseOut={() => setShowMenu(false)}/>
        <div className={`dropdown-menu ${showMenu ? 'open-menu' : ''}`}>
          <Link 
            to={`/single-vehicle/${_id}`}
            className='dropdown-link'
            >
            more...
          </Link>
          { user.role === 'admin' && 
            <Link 
              to={`/update-vehicle/${_id}`}
              className='dropdown-link'
              >
              update
            </Link>
          }
          { user.role === 'admin' && 
            <Link 
              to={`/delete-vehicle/${_id}`}
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

export default Vehicle