const express = require('express')
const router = express.Router()
const userAuthentication = require('../middleware/auth')
const { registerAdmin, loginAdmin, authenticateAdmin } = require('../controllers/admin')

// admin routes
router.post('/register-admin', registerAdmin)
router.post('/login-admin', loginAdmin)
router.get('/authenticate', userAuthentication, authenticateAdmin)

module.exports = router