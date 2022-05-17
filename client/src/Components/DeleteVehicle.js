import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VehicleServices from '../services/VehicleServices'
import { useGlobalContext } from '../context/Context'
import Message from './Message'
import '../css/DeleteVehicle.css'

const DeleteVehicle = () => {
  const [alert, setAlert] = useState()
  const [error, setError] = useState(false)
  const { id } = useParams()
  const { token } = useGlobalContext()
  const navigate = useNavigate()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    VehicleServices.deleteVehicle(id, token).then(data => {
      if (data.message.isAuthenticated) {
        setAlert(data.message.msgBody)
        setError(true)
      } else {
        setAlert('User not authenticated')
        setError(data.message.msgError)
      }
      console.log(data);
      setTimeout(() => {
        setAlert('')
        setError(false)
        navigate('/', { replace: true })
      }, 1500)
    })
  }

  return (
    <section className='delete-vehicle'>
    <h2>Delete Vehicle</h2>
      <div className='delete-vehicle-container'>
        <form onSubmit={onSubmitHandler}>
          <label>Vehicle ID</label>
          <input
            type='text'
            value={id}
            className='delete-vehicle-input'
          />
          <input
            type='submit'
            value='Submit'
            className='delete-vehicle-input delete-vehicle-btn'
          />
        </form>
        { alert && <Message message={alert} error={error} /> }
      </div>
    </section>
  )
}

export default DeleteVehicle