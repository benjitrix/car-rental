const mongoose = require('mongoose')
const Schema = mongoose.Schema

// vehicle schema for car to rent
const VehicleSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Please provide type']
  },
  brand: {
    type: String,
    required: [true, 'Please provide brand']
  },
  model: {
    type: String,
    required: [true, 'Please provide model']
  },
  year: {
    type: String,
    required: [true, 'Please provide year']
  },
  color: {
    type: String,
    required: [true, 'Please provide color']
  },
  price: {
    type: Number,
    required: [true, 'Please provide price']
  },
  images: {
    type: [String],
    required: [true, 'Please provide images']
  }
}, { timestamps: true })

module.exports = mongoose.model('Vehicle', VehicleSchema)