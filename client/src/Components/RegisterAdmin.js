import React, { useState } from 'react'
import AdminServices from '../services/AdminServices'
import { Link, useNavigate } from 'react-router-dom'
import Message from './Message'
import '../css/RegisterUser.css'

const RegisterAdmin = () => {
  const [user, setUser] = useState({name: '', email: '', password: ''})
  const [error, setError] = useState(false)
  const [alert, setAlert] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(user);

    AdminServices.registerAdmin(user).then(data => {
      console.log(data);
    })
  }

  // setTimeout(() => {
  //   navigate('/login', { replace: true})
  //   // setAlert('')
  // }, 1800)

  return (
    <section className='register-user'>
      <h2>Admin Register</h2>
      <div className='register-user-container'>
        <form onSubmit={onSubmitHandler}>
          <label>name</label>
          <input
            type="text"
            name='name'
            onChange={(e) => onChangeHandler(e)}
            className='register-input'
          />
          <label>email</label>
          <input 
            type="text"
            name='email'
            onChange={(e) => onChangeHandler(e)}
            className='register-input'
          />
          <label>password</label>
          <input
            type="password"
            name='password'
            onChange={(e) => onChangeHandler(e)}
            className='register-input'
          />
          <input
          type='submit'
          value="Submit"
          className='register-submit register-input'
          variant='contained'
          />
          {/* { alert && <Message message={alert} error={error} /> } */}
        </form>
        <p>Registered as admin? <Link to='/login-admin'>login as admin</Link></p>
      </div>
    </section>
  )
}

export default RegisterAdmin