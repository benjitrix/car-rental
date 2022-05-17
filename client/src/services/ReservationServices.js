const url = '/api/v1/vehicle-reservation'

export default {
  getReservationsFromCart: (token) => {
    return fetch(`${url}/user-reservations`, {
      method: 'GET',
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  getSingleReservationFromCart: (token, id) => {
    return fetch(`${url}/single-reservation/${id}`, {
      method: 'GET',
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  addReservationToCart: (token, id, reservation) => {
    return fetch(`${url}/add/${id}`, {
      method: 'POST',
      body: JSON.stringify(reservation),
      headers: { 
        Authorization: token,
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => data)
  },
  updateReservation: (token, id, update, index) => {
    return fetch(`${url}/update/${id}/${index}`, {
      method: 'POST',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }).then(res => res.json())
      .then(data => data)
  },
  deleteReservationFromCart: (token, id) => {
    return fetch(`${url}/remove/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token}
    }).then(res => res.json())
      .then(data => data)
  }
}