import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/CheckoutSuccess.css'

const CheckoutSuccess = () => {
  let navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true })
    }, 2500)
  }, [])

    return (
      <div className='checkout-success'>
        <h4>Thank you</h4>
        <h4>your payment was successful</h4>
        <h4>redirecting to home page shortly...</h4>
      </div>
    )

}

export default CheckoutSuccess