import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaShoppingCart } from 'react-icons/fa'
import { useGlobalContext } from '../context/Context'
import '../css/Navbar.css'

const Navbar = () => {
  const [show, setShow] = useState(false)
  const [userShown, setUserShown] = useState()
  const { user } = useGlobalContext()

  useEffect(() => {
    setUserShown(user.name)
  }, [user])

  const menuHeight1 = () => {
    const ele = document.getElementsByClassName('show-links')
    const rectHeight = ele.clientHeight
    console.log(rectHeight);
  }

  return (
    <section className='navbar'>
      <div className='navbar-container'>
        <h2 className='logo'>
          <Link to='/' className='logo-link'>Car Rental!</Link>
        </h2>
        <div className='cart-user-hamburger'>
          <Link 
            to='/cart' 
            className='cart-link'>
              <FaShoppingCart />
          </Link>
          { user.name && <p className='user-link'>{userShown}</p>}
          <button className='hamburger-link' onClick={() => {setShow(!show); menuHeight1()}}>
            <FaBars />
          </button>
        </div>
      </div>
      {
        <div className={`drop-down-menu ${show ? 'show-links' : '' }`}>
          <Link 
            to='/'
            onClick={() => setShow(!show)}
            className='drop-down-link'
            >
            Home
          </Link>
          {
            user && 
              <Link 
                to='/cart'
                onClick={() => setShow(!show)}
                className='drop-down-link'
                >
                User Reservations
              </Link>
          }
          <Link 
            to='/about'
            onClick={() => setShow(!show)}
            className='drop-down-link'
            >
            About
          </Link>
          {
            user.role === 'admin' && 
              <Link 
                to='/register-vehicle'
                onClick={() => setShow(!show)}
                className='drop-down-link'
                >
                Register Vehicle
              </Link>
          }
          {
            user.name === '' ? 
              <Link 
                to='/login'
                onClick={() => setShow(!show)}
                className='drop-down-link' 
                >
                Login
              </Link> : 
              <Link 
                to='/logout'
                onClick={() => setShow(!show)}
                className='drop-down-link' 
                >
                Logout
              </Link>
          }
        </div>
      }
    </section>
  )
}

export default Navbar