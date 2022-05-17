import React, { useContext, useState, useEffect } from 'react'
import ReservationServices from '../services/ReservationServices'
import { useGlobalContext } from './Context'

export const CartContext = React.createContext()

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([])
  const { isAuthenticated } = useGlobalContext()
  const [token, setToken] = useState(localStorage.getItem('car-rental-token'))

  useEffect(() => {
    // fetchCartItems()
    ReservationServices.getReservationsFromCart(token).then(data => {
      setCart(data.message.reservations)
      console.log(data);
    })
  }, [isAuthenticated])

  const fetchCartItems = () => {
    if (isAuthenticated) {
      ReservationServices.getReservationsFromCart(token).then(data => {
        setCart(data.message.reservations)
        console.log(data);
      })
    }
  }

  return (
    <CartContext.Provider value={{
      cart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}

// custom hook
export const useCartGlobalContext = () => {
  return useContext(CartContext)
}
