const express = require('express')
const router = express.Router()
const { getReservationsFromCart, getSingleReservationFromCart, addReservationToCart, updateReservationInCart, removeReservationFromCart } = require('../controllers/reservation')

// reservation routes
router.get('/user-reservations', getReservationsFromCart)
router.get('/single-reservation/:id', getSingleReservationFromCart)
router.post('/add/:id', addReservationToCart)
router.post('/update/:id/:index', updateReservationInCart)
router.delete('/remove/:id', removeReservationFromCart)

module.exports = router