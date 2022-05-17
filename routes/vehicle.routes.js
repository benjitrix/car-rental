const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { getAllVehicles, getVehicle, registerVehicle, updateVehicle, removeVehicle } = require('../controllers/vehicle')

// vehicle routes
router.get('/all', getAllVehicles)
router.get('/:id', getVehicle)
router.post('/register', upload.array('images', 12), registerVehicle)
router.put('/update/:id', upload.array('images', 12), updateVehicle)
router.delete('/delete/:id', removeVehicle)

module.exports = router