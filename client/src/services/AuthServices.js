const url = 'api/v1/user'

export default {
  registerUser: (user) => {
    return fetch(`${url}/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" }
    }).then(res => res.json())
      .then(data => data)
  },
  loginUser: (user) => {
    return fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" }
    }).then(res => res.json())
      .then(data => data)
  },
  isAuthenticated: (token) => {
    return fetch(`${url}/authenticate`, {
      method: 'GET',
      headers: { Authorization: token}
    }).then(res => res.json())
      .then(data => data)
  },
}