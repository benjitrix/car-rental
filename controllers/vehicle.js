const { BadRequestError } = require('../errors')
const asyncWrapper = require('../middleware/async')
const Vehicle = require('../models/Vehicle.model')
const Admin = require('../models/Admin.model')
const cloudinary = require('../middleware/cloudinary')
const fs = require('fs')

// /////vehicle controllers///////

// ***get all vehicles***
const getAllVehicles = asyncWrapper(async (req, res, next) => {
  const vehicles = await Vehicle.find({})

  res.status(200).json({message: {
    msgBody: 'All vehicles retrieved',
    msgError: false,
    vehicles: vehicles
  }})
})

// ***get vehicle***
const getVehicle = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  console.log('Req.Params: ', id);

  const vehicle = await Vehicle.find({_id: id})
  if (!vehicle) {
    throw new BadRequestError('Vehicle not found')
  }

  res.status(200).json({message: {
    msgBody: `vehicle with id -${id}- found`,
    msgError: false,
    vehicle: vehicle[0]
  }})
})

// ***register new vehicle***
const registerVehicle = asyncWrapper(async (req, res, next) => {
  const { type, brand, model, year, color, price } = req.body
  console.log('Req.body: ', req.body)
  console.log('Req.files: ', req.files)
  
  // check for undefined vehicle properties
  Object.keys(req.body).forEach((key, i) => {
    if (!`${req.body[key]}`) {
      throw new BadRequestError(`Please provide vehicle ${key} property`)
    }
  })

  const uploader = async (path) => await cloudinary.uploads(path, 'car-rental')

  const images = req.files
  if (images.length < 1) {
    throw new BadRequestError('Please provide event images')
  }

  // set up cloudinary url paths in array of strings
  const urls = []
  for (const image of images) {
    const imagePath = image.path
    const imageURL = await uploader(imagePath)
    urls.push(imageURL.url)
    fs.unlinkSync(imagePath)
  }

  // new vehicle object
  const newVehicle = new Vehicle({
    type: type,
    brand: brand,
    model: model,
    year: year,
    color: color,
    price: price,
    images: urls,
    createdBy: req.user.name
  })

  // create
  const vehicle = await Vehicle.create(newVehicle)
  const admin = await Admin.findOne({_id: req.user.userId})
  if (!admin) {
    throw new CustomAPIError('Admin not found', 404, true)
  }
  await admin.vehiclesCreated.push(vehicle)
  await admin.save()

  res.status(200).json({message: {
    msgBody: `New vehicle model -${vehicle.model}- created`,
    msgError: false,
    vehicle: vehicle,
    isAuthenticated: true
  }})
})

// ***update vehicle: Admin role required***
const updateVehicle = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  console.log('Req.Params: ', id);

  const uploader = async (path) => await cloudinary.uploads(path, 'car-rental')
  const images = req.files

  // transform req.body to key/value pairs object
  let vehicleObject = {}
  const updateVehicle = req.body
  for (const key in updateVehicle) {
    vehicleObject[key] = updateVehicle[key]
  }

  // check if new images are uploaded or existing one(s) unchanged, add to vehicleOject object
  if (images.length < 1 && vehicleObject['images'] !== []) {
    console.log('No images to update');
  } else {
    const urls = []
    for (const image of images) {
      const imagePath = image.path
      const imageURL = await uploader(imagePath)
      urls.push(imageURL.url)
      fs.unlinkSync(imagePath)
    }
    vehicleObject['images'] = urls
  }

  // update call
  const vehicle = await Vehicle.findOneAndUpdate({_id: id}, vehicleObject, { new: true, runValidators: true})

  if (!vehicle) {
    throw new BadRequestError('Vehicle not updated!')
  }

  res.status(200).json({message: {
    msgBody: `Event -${vehicle.model}- updated`,
    msgError: false,
    isAuthenticated: true
  }})
})

// ***remove vehicle: Admin role required***
const removeVehicle = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  console.log(('Vehicle to delete: ', id));
  const vehicleToDelete = await Vehicle.findOne({_id: id})
  const vehicle = await Vehicle.deleteOne({_id: id})

  // remove deleted vehicle references in user documents
  const admin = await Admin.findOne({_id: req.user.userId})
  const index = admin.vehiclesCreated.indexOf(id)
  admin.vehiclesCreated.splice(index, 1)
  admin.save()

  if (!vehicleToDelete) {
    throw new BadRequestError('Vehicle not found')
  }

  res.status(200).json({message: {
    msgBody: `Vehicle -${vehicleToDelete.model}- deleted`,
    msgError: false,
    isAuthenticated: true
  }})
})

module.exports = { getAllVehicles, getVehicle, registerVehicle, updateVehicle, removeVehicle }