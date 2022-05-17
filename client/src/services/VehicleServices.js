const url = '/api/v1/vehicle'
const urlVehicles = '/api/v1/vehicles'

export default {
  registerVehicle: (vehicle, token) => {
    return fetch(`${url}/register`, {
      method: 'POST',
      body: vehicle,
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  updateVehicle: (update, token, id) => {
    return fetch(`${url}/update/${id}`, {
      method: 'PUT',
      body: update,
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  }, 
  deleteVehicle: (id, token) => {
    return fetch(`${url}/delete/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  getAllVehicles: () => {
    return fetch(`${urlVehicles}/all`)
      .then(res => res.json())
      .then(data => data)
  }, 
  getVehicle: (id) => {
    return fetch(`/api/v1/vehicle-single/${id}`)
    .then(res => res.json())
    .then(data => data)
  }
}