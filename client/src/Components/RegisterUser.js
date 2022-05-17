import React, { useState } from 'react'
import AuthServices from '../services/AuthServices'
import { Link, useNavigate } from 'react-router-dom'
import Message from './Message'
import '../css/RegisterUser.css'

const RegisterUser = () => {
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

    AuthServices.registerUser(user).then(data => {
      if (data.message.userValid) {
        setAlert(data.message.msgBody)
        setError(data.message.msgError)
        setShowAlert(true)
      } else {
        setAlert(data.message.msgBody)
        setError(data.message.msgError)
        setShowAlert(true)
      }
      console.log(data);
    })
  }

  setTimeout(() => {
    navigate('/login', { replace: true})
    setAlert('')
    setShowAlert(false)
  }, 1800)

  return (
    <section className='register-user'>
      <h2>Register</h2>
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
          { showAlert && <Message message={alert} error={error} /> }
        </form>
        <p>Already registered? <Link to='/login'>login</Link></p>
      </div>
    </section>
  )
}

export default RegisterUser