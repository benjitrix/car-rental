import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/Context'
import VehicleServices from '../services/VehicleServices'
import Message from './Message'
import '../css/RegisterVehicle.css'

const RegisterVehicle = () => {
  const[vehicle, setVehicle] = useState({type: '', brand: '', model: '', year: '', color: '', price: ''})
  const [vehiclePhotos, setVehiclePhotos] = useState([])
  const [alert, setAlert] = useState()
  const [error, setError] = useState(false)

  const { token } = useGlobalContext()
  const navigate = useNavigate()

  // onchange handler
  const onChangeHandler = (e) => {
    setVehicle({...vehicle, [e.target.name]: e.target.value})
  }

  // file onchange handler
  const onChangeFileHandler = (e) => {
    const pics = e.target.files
    setVehiclePhotos(pics)
    setVehicle({...vehicle, [e.target.name]: pics})
  }

  // onsubmit handler
  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (token) {
      const fd = new FormData()
      let vehicleObject = {}
      Object.keys(vehicle).forEach(key => {
        if (vehicle[key].length !== 0) {
          vehicleObject[key] = vehicle[key]
          if (key === 'images') {
            for (let i = 0; i < vehiclePhotos.length; i++) {
              fd.append('images', vehiclePhotos[i])
            }
          }
          fd.append(`${key}`, vehicle[key])
        }
      })

      VehicleServices.registerVehicle(fd, token).then(data => {
        if (data.message.isAuthenticated) {
          setAlert(data.message.msgBody)
          setError(data.message.msgError)
        } else {
          setAlert('Vehicle not registered')
          setError(true)
        }
        console.log(data);
        setTimeout(() => {
          setAlert('')
          setError(false)
          navigate('/', { replace: true })
        }, 1500)
      })
    }
  }

  return (
    <section className='register-vehicle'>
      <h2>Register vehicle</h2>
      <div className='register-vehicle-container'>
        <form onSubmit={onSubmitHandler}>
          <label>Type</label>
          <input
            type='text'
            name='type'
            onChange={(e) => onChangeHandler(e)}
            className='register-vehicle-input'
          />
          <label>Brand</label>
          <input
            type='text'
            name='brand'
            onChange={(e) => onChangeHandler(e)}
            className='register-vehicle-input'
          />
          <label>Model</label>
          <input
            type='text'
            name='model'
            onChange={(e) => onChangeHandler(e)}
            className='register-vehicle-input'
          />
          <label>Year</label>
          <input
            type='text'
            name='year'
            onChange={(e) => onChangeHandler(e)}
            className='register-vehicle-input'
          />
          <label>Color</label>
          <input
            type='text'
            name='color'
            onChange={(e) => onChangeHandler(e)}
            className='register-vehicle-input'
          />
          <label>Price</label>
          <input
            type='number'
            name='price'
            onChange={(e) => onChangeHandler(e)}
            className='register-vehicle-input'
          />
          <input
            type='file'
            name='images'
            onChange={(e) => onChangeFileHandler(e)}
            className='register-vehicle-input'
            multiple
          />
          <input
            type='submit'
            value='Submit'
            className='register-vehicle-btn register-vehicle-input'
          />
        </form>
        { alert && <Message message={alert} error={error} /> }
      </div>
    </section>
  )
}

export default RegisterVehicle