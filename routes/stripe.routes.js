const express = require('express')
const stripeAPI = require('../controllers/stripe')
const router = express.Router()

// stripe routes
router.post('/create-payment-intent', stripeAPI )

module.exports = router