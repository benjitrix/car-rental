import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import StripeServices from '../services/StripeServices'
import { useCartGlobalContext } from '../context/CartContext'
import { useGlobalContext } from '../context/Context'
import '../css/StripeCheckout.css'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [showBtn, setShowBtn] = useState(true)

  const { cart } = useCartGlobalContext()
  const { token } = useGlobalContext()

  // check out with stripe
  const payWithStripe = () => {
    const vehicleQuantities = document.getElementsByClassName('cart-quantity-input')
    const qtyArr = [...vehicleQuantities]

    const reservationDurations = document.getElementsByClassName('cart-duration')
    const reservationArr = [...reservationDurations]

    const cartArr = []
    cart.forEach((item, index) => {
      let cartObj = {}
      cartObj['id'] = item.vehicleItem._id
      cartObj['duration'] = reservationArr[index].textContent
      cartObj['quantity'] = qtyArr[index].value
      cartArr.push(cartObj)
    })
    console.log('cartArr: ',cartArr);
    StripeServices.payWithStripe(token, cartArr).then(data => {
      setClientSecret(data.clientSecret)
      console.log(data);
    })
  }

  // update reservations if there are changes
  const updateReservations = () => {
    
  }

  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
    }
  };

  const options = {
    clientSecret,
    appearance,
  };


  return (
    <section className='stripe-checkout'>
      <div className='stripe-checkout-container'>
        <div className='pre-checkout-btn'>
          {
            showBtn &&
            <button 
              onClick={() => payWithStripe()}
            >
              Checkout
            </button>
          }
        </div>
        <div className='stripe-checkout'>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
    </section>
  )
}

export default StripeCheckout