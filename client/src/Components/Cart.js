import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ReservationServices from '../services/ReservationServices'
import { FaTrashAlt } from 'react-icons/fa'
import StripeCheckout from './StripeCheckout'
import '../css/Cart.css'

const Cart = () => {
  const [reservations, setReservations] = useState([])
  const [reservation, setReservation] = useState({start: '', end: '', quantity: ''})
  const [input, setInput] = useState({start: '', end: '', quantity: ''})
  const [change, setChange] = useState({value: true, row: 0})
  const [count, setCount] = useState(0)
  const [duration, setDuration] = useState()
  const [period, setPeriod] = useState(true)
  const [removeReservation, setRemoveReservation] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('car-rental-token'))

  const totalPriceRef = useRef()
  const startRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCartItems(token)
  }, [removeReservation])

  useEffect(() => {
    setTimeout(() => {
      sumTotalPrice()
    }, 1000)
  }, [removeReservation])

  // fetch reservations in cart
  const fetchCartItems = (token) => {
    ReservationServices.getReservationsFromCart(token).then(data => {
      setReservations(data.message.reservations)
      setCount(data.message.reservationCount)
      console.log(data);
    })
  }

  // input change handler
  const onChangeHandler = (e, index) => {
    // setChange({value: true, row: index})
    const start = document.getElementsByClassName('start')
    const startArr = [...start]
    startArr.forEach((item, i) => {
      if (index === i) {
        setChange({value: false})
        setInput({...input, [e.target.name]: e.target.value})
      }
    })
    console.log('index: ', index);
  }

  // submit handler
  const onSubmitHandler = (e) => {
    console.log(input);
  }

  // get single reservation (for mobile view)
  const getSingleReservation = (id, index) => {
    if (token) {
      navigate(`/single-reservation/${id}/${index}`, { replace: true })
    } else {
      console.log('Token not provided. Please log in');
    } 
  }

  // add all total prices
  const sumTotalPrice = (e) => {
    const total = [...document.getElementsByClassName('total-price')]
    let sum = 0
    total.forEach((item) => {
      sum = sum + Number(item.textContent);
    })
    totalPriceRef.current.textContent = `$${sum}`;
  }

  // remove reservation from cart
  const deleteReservation = (e, id) => {
    console.log(id);
    ReservationServices.deleteReservationFromCart(token, id).then(data => {
      setRemoveReservation(!removeReservation)
      console.log(data);
    })
  }
  
  return (
    <section className='cart'>
      <div className='cart-container'>
        {/* render for @media screen = mobile */}
        <div className='reservations'>
          <h2>Cart</h2>
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Days</th>
                <th>Units</th>
                <th>Price($)</th>
                <th>Total Price($)</th>
              </tr>
            </thead>
            <tbody>
              {
                reservations.map((reservation, index) => {
                  return (
                    <tr key={index} onClick={() => getSingleReservation(reservation._id, index)}>
                      <td>
                        <img src={reservation.vehicleItem.images[0]} className='cart-vehicle-photo' />
                      </td>
                      <td className='cart-duration'>{reservation.duration}</td>
                      <td>{reservation.quantity}</td>
                      <td>{reservation.vehicleItem.price}</td>
                      <td className='total-price'>{Number(reservation.duration * reservation.quantity * reservation.vehicleItem.price)}</td>
                      <td>
                        <button 
                          onClick={(e) => deleteReservation(e, reservation._id)}
                          className='cart-remove-btn'
                          >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
              <tr className='table-total'>
                <td colSpan='1' className='table-highlight'>Total</td>
                <td colSpan='7' className='table-highlight sum' ref={totalPriceRef}></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* render for @media screen = 996px */}
        <div className='reservations-996px'>
          <h2>Cart</h2>
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Start</th>
                <th>End</th>
                <th>Days</th>
                <th>Units</th>
                <th>Price($)</th>
                <th>Total Price($)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                reservations.map((reservation, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={reservation.vehicleItem.images[0]} className='cart-vehicle-photo' />
                      </td>
                      <td>
                        <input
                          type='date'
                          name='start'
                          value={change.value ? reservation.start : input.start}
                          onChange={(e) => onChangeHandler(e, index)}
                          className='cart-date-input start-date'
                        />
                      </td>
                      <td>
                        <input
                          type='date'
                          name='end'
                          value={change.value ? reservation.end : input.end}
                          onChange={(e) => onChangeHandler(e, index)}
                          className='cart-date-input end-date'
                        />
                      </td>
                      <td className='cart-duration'>{period ? reservation.duration: duration}</td>
                      <td>
                        <input
                          type='number'
                          name='quantity'
                          value={change.value ? reservation.quantity : input.quantity}
                          onChange={(e) => onChangeHandler(e, index)}
                          className='cart-quantity-input'
                        />
                      </td>
                      <td>{reservation.vehicleItem.price}</td>
                      <td className='total-price'>{Number(reservation.duration * reservation.quantity * reservation.vehicleItem.price)}</td>
                      <td>
                        <button 
                          onClick={(e) => deleteReservation(e, reservation._id)}
                          className='cart-remove-btn'
                          >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
              <tr className='table-total'>
                <td colSpan='1' className='table-highlight'>Total</td>
                <td colSpan='7' className='table-highlight' ref={totalPriceRef}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='stripe-payment'>
          <h2>Payment</h2>
          <StripeCheckout className='stripe-checkout' />
          <button onClick={(e) => onSubmitHandler(e)}>Submit Test</button>
        </div>
      </div>
    </section>
  )
}

export default Cart