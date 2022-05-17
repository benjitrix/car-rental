const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, authenticateUser } = require('../controllers/user')
const userAuthentication = require('../middleware/auth')

// user routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('logout', logoutUser)
router.get('/authenticate', userAuthentication, authenticateUser)

module.exports = router