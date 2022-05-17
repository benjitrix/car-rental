import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Message from './Message'
import VehicleServices from '../services/VehicleServices'
import { useGlobalContext } from '../context/Context'
import '../css/UpdateVehicle.css'

const UpdateVehicle = () => {
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(false)
  const [vehiclePhotos, setVehiclePhotos] = useState([])
  const [fileImages, setFileImages] = useState(false)
  const [vehicle, setVehicle] = useState({type: '', brand: '', model: '', year: '', color: '', price: '', images: []})

  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useGlobalContext()

  // on opening component, fetch vehicle and fill input form
  useEffect(() => {
    fetchVehicle()
  }, [])

  const fetchVehicle = () => {
    VehicleServices.getVehicle(token, id).then(data => {
      setVehicle(data.message.vehicle)
      console.log(data);
    })
  }

  const onChangeHandler = (e) => {
    setVehicle({...vehicle, [e.target.name]: e.target.value})
  }

  const onChangeFileHandler = (e) => {
    vehicle.images = []
    setVehiclePhotos(e.target.files)
    setFileImages(true)
    console.log(vehicle.images);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (token) {
      const fd = new FormData()
      let vehicleObject = {}
      Object.keys(vehicle).forEach(key => {
        if (vehicle[key].length !== 0) {
          vehicleObject[key] = vehicle[key]
          fd.append(`${key}`, vehicleObject[key])
          if (fileImages === false) {
            console.log('No file images selected');
            fd.delete('images')
            vehicle.images.forEach(item => {
              fd.append('images', item)
            })
          } else if (fileImages === true) {
            console.log('Image files selected');
            fd.delete('images')
            for (let i = 0; i < vehiclePhotos.length; i++) {
              fd.append('images', vehiclePhotos[i])
            }
          }
        }
      })
      VehicleServices.updateVehicle(fd, token, id).then(data => {
        if (data.message.IsAuthenticated) {
          setAlert(data.message.msgBody)
          setError(data.message.msgError)
        } else {
          setAlert('vehicle not updated')
          setError(true)
        }
        console.log(data);
      })

      setTimeout(() => {
        navigate('/', { replace: true })
      }, 1500)
    }
  }

  return (
    <section className='update-vehicle'>
      <h2>Update Vehicle</h2>
      <div className='update-vehicle-container'>
        <form onSubmit={onSubmitHandler}>
          <label>Type</label>
          <input
            type='text'
            name='type'
            value={vehicle.type}
            onChange={(e) => onChangeHandler(e)} 
            className='update-vehicle-input'
          />
          <label>Brand</label>
          <input
            type='text'
            name='brand'
            value={vehicle.brand}
            onChange={(e) => onChangeHandler(e)}
            className='update-vehicle-input'
          />
          <label>Model</label>
          <input
            type='text'
            name='model'
            value={vehicle.model}
            onChange={(e) => onChangeHandler(e)}
            className='update-vehicle-input'
          />
          <label>year</label>
          <input
            type='text'
            name='year'
            value={vehicle.year}
            onChange={(e) => onChangeHandler(e)}
            className='update-vehicle-input'
          />
          <label>Color</label>
          <input
            type='text'
            name='color'
            value={vehicle.color}
            onChange={(e) => onChangeHandler(e)}
            className='update-vehicle-input'
          />
          <label>Price</label>
          <input
            type='text'
            name='price'
            value={vehicle.price}
            onChange={(e) => onChangeHandler(e)}
            className='update-vehicle-input'
          />
          <label>Images</label>
          <input
            type='file'
            name='images'
            onChange={(e) => onChangeFileHandler(e)}
            className='update-vehicle-input'
            multiple
          />
          <input
            type='submit'
            value='Submit Update'
            className='update-vehicle-input update-vehicle-btn'
          />
        </form>
        { alert && <Message message={alert} error={error} />}
      </div>
    </section>
  )
}

export default UpdateVehicle