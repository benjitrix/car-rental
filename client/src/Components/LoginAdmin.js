import React, { useState }from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AdminServices from '../services/AdminServices'
import Message from './Message'
import { useGlobalContext } from '../context/Context'
import '../css/LoginUser.css'

const LoginAdmin = () => {
  const [user, setUser] = useState({email: '', password: ''})
  const [error, setError] = useState(false)
  const [alert, setAlert] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const { setToken, setIsAuthenticated } = useGlobalContext()
  const navigate = useNavigate()

  // change handler
  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  // submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault()
    AdminServices.loginAdmin(user).then(data => {
      if (data.message.isAuthenticated) {
        localStorage.setItem('car-rental-token', `Bearer ${data.message.token}`)

        setToken(data.message.token)
        setIsAuthenticated(data.message.isAuthenticated)
        setUser({name: data.message.user})
        setAlert('User is authenticated')
        setError(false)
        setShowAlert(true)

        setTimeout(() => {
          navigate('/', { replace: true })
        }, 1800)
      } else {
        setAlert('User not authenticated')
        setError(true)
        setShowAlert(true)
      }
      console.log(data);
    })
    setUser({email: '', password: ''})
    setTimeout(() => {
      setError(false)
      setShowAlert(false)
    },2000)
  }

  

  return (
    <section className='login-user'>
      <h2>Admin login</h2>
      <div className='login-user-container'>
        <form onSubmit={onSubmitHandler}>
          <label>email</label>
          <input
            type='text'
            value={user.email}
            name='email'
            onChange={(e) => onChangeHandler(e)}
            className='login-input'
          />
          <label>password</label>
          <input
            type='password'
            value={user.password}
            name='password'
            onChange={(e) => onChangeHandler(e)}
            className='login-input'
          />
          <input
            type='submit'
            value='Submit'
            className='login-submit login-input'
          />
          { showAlert && <Message message={alert} error={error} />}
        </form>
        <p>Admin registered? <Link to='/register-admin'>Register</Link></p>
      </div>
    </section>
  )
}

export default LoginAdmin