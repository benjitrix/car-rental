const { BadRequestError, CustomAPIError } = require("../errors");
const asyncWrapper = require("../middleware/async");
const Vehicle = require('../models/Vehicle.model')
const User = require('../models/User.model')
const Admin = require('../models/Admin.model');
const { populate } = require("../models/User.model");

// get ALL reservations from cart
const getReservationsFromCart = asyncWrapper (async (req, res, next) => {
  let reservationsInCart = []

  // admin 
  if (req.user.role === 'admin') {
    reservationsInCart = await Admin.findOne({_id: req.user.userId}).populate(
      {
        path: 'reservation.vehicleItem',
        select: 'type brand model year color price images'
      }
    )
    if (!reservationsInCart) {
      throw new CustomAPIError('Reservations not found', 404, true)
    }
  }

  // user
  if (req.user.role === 'user') {
    reservationsInCart = await User.findOne({_id: req.user.userId}).populate(
      {
        path: 'reservation.vehicleItem',
        select: 'type brand model year color price images'
      }
    )
    if (!reservationsInCart) {
      throw new CustomAPIError('Reservations not found', 404, true)
    }
  }

  res.status(200).json({message: {
    msgBody: "User's reservations retrieved",
    msgError: false,
    IsAuthenticated: true,
    reservations: reservationsInCart.reservation,
    reservationCount: reservationsInCart.reservation.length
  }})
})

// get single reservation from cart
const getSingleReservationFromCart = asyncWrapper (async (req, res, next) => {
  const { id } = req.params
  
  let reservationInCart
  let reservationIndex = 0
  // user
  if (req.user.role === 'user') {
    const user = await User.findOne({_id: req.user.userId})
    if (!user) {
      throw new BadRequestError('User not found')
    }
    user.reservation.forEach((item, index) => {
      if (item._id.valueOf() === id) {
        reservationIndex = index
      }
    })
    reservationInCart = await User.findOne({_id: req.user.userId}).populate(
      {
        path: 'reservation.vehicleItem',
        select: 'type brand model year color price images'
      }
    )
  }

  // admin
  if (req.user.role === 'admin') {
    const admin = await Admin.findOne({_id: req.user.userId})
    if (!admin) {
      throw new BadRequestError('Admin not found')
    }
    admin.reservation.forEach((item, index) => {
      if (item._id.valueOf() === id) {
        reservationIndex = index
      }
    })
    reservationInCart = await Admin.findOne({_id: req.user.userId}).populate(
      {
        path: 'reservation.vehicleItem',
        select: 'type brand model year color price images'
      }
    )
  }
  
  res.status(200).json({message: {
    msgBody: 'Reservation retrieved',
    msgError: false,
    reservation: reservationInCart.reservation[reservationIndex]
  }})
})

// add reservation to cart
const addReservationToCart = asyncWrapper (async (req, res, next) => {
  const { id } = req.params
  console.log('Cart id: ', id, 'Cart token: ', req.user.userId, 'Cart qty: ', req.body);

  const { start, end, quantity } = req.body

  const diff = Math.abs(new Date(start) - new Date(end))
  const days = Number(diff/(60*60*24*1000));

  const vehicle = await Vehicle.findOne({_id: id})
  if (!vehicle) {
    throw new BadRequestError('Vehicle not found')
  }

  const user = await User.findOne({_id: req.user.userId})
  const admin = await Admin.findOne({_id: req.user.userId})
  if (!user && !admin) {
    throw new CustomAPIError('User not found', 404, true)
  }
  const booking = {vehicleItem: id, quantity: quantity, start: start, end: end, duration: days}
  console.log(booking);

  // push, save reservation
  if (user) {
    console.log('user reservation');
    await User.updateOne(
      { _id: req.user.userId },
      { $push: { reservation: booking }}
    )
    await user.save()
  } else if (admin) {
    console.log('admin reservation');
    await Admin.updateOne(
      { _id: req.user.userId },
      { $push: { reservation: booking }}
    )
    await admin.save()
  }

  res.status(200).json({message: {
    msgBody: `Vehicle: ${vehicle.model}, number: ${number} saved in cart`,
    msgError: false,
    isAuthenticated: true
  }})
})

// update reservation
const updateReservationInCart = asyncWrapper(async (req, res, next) => {
  const { id, index } = req.params
  const { start, end, quantity } = req.body
  console.log('Update reservation: ', req.body);
  console.log('Req params: ', req.params);

  const diff = Math.abs(new Date(start) - new Date(end))
  const days = Number(diff/(60*60*24*1000)); 
  
  const user = await User.updateOne(
    {_id: req.user.userId},
    {
      $set: {
        [`reservation.${index}.start`]: start,
        [`reservation.${index}.end`]: end,
        [`reservation.${index}.duration`]: days,
        [`reservation.${index}.quantity`]: quantity
      }
    }
  )
  if (!user) {
    throw new BadRequestError('Reservation not updated')
  }

  res.status(200).json({message: {
    msgBody: 'Reservation updated',
    msgError: false
  }})
})

// remove reservation from cart
const removeReservationFromCart = asyncWrapper (async (req, res, next) => {
  const { id } = req.params

  const admin = await Admin.findOne({_id: req.user.userId})
  const user = await User.findOne({_id: req.user.userId})
  let reservationIndex = 0

  if (req.user.role === 'admin') {
    if (admin.reservation === []) {
      throw new BadRequestError('No user reservation found')
    }

    await admin.reservation.forEach((item, index) => {
      if (item._id.valueOf() === id) 
      reservationIndex = index
    })

    await Admin.findOneAndUpdate(
      {_id: req.user.userId},
      {$pull: { reservation: {_id: id} }}
    )
    await admin.save()
  } else if (req.user.role === 'user') {
    if (user.reservation === []) {
      throw new BadRequestError('No user reservation found')
    }

    await user.reservation.forEach((item, index) => {
      if (item._id.valueOf() === id) 
      reservationIndex = index
    })

    await User.findOneAndUpdate(
      {_id: req.user.userId},
      {$pull: { reservation: {_id: id} }}
    )
    await user.save()
  }
  
  res.status(200).json({message: {
    msgBody: `Reservation removed from cart`,
    msgError: false
  }})
})

module.exports = { getReservationsFromCart, getSingleReservationFromCart, addReservationToCart, updateReservationInCart,removeReservationFromCart }