const url = 'api/v1/admin'

export default {
  registerAdmin: (user) => {
    return fetch(`${url}/register-admin`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" }
    }).then(res => res.json())
      .then(data => data)
  },
  loginAdmin: (user) => {
    return fetch(`${url}/login-admin`, {
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
  }
}