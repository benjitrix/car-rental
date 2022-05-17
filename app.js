const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

const connectDB = require('./db/connect')
const userRouter = require('./routes/user.routes')
const vehicleRouter = require('./routes/vehicle.routes')
const adminRouter = require('./routes/admin.routes')
const reservationRouter = require('./routes/reservation.routes')
const stripeRouter = require('./routes/stripe.routes')
const userAuthentication = require('./middleware/auth')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// json middleware
app.use(express.json())

// routes middleware
app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/vehicle', userAuthentication, vehicleRouter)
app.use('/api/v1/vehicle-single', vehicleRouter)
app.use('/api/v1/vehicles', vehicleRouter)
app.use('/api/v1/vehicle-reservation', userAuthentication, reservationRouter)
app.use('/api/v1/stripe', userAuthentication, stripeRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

// production 
if (process.env.NODE.ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

// start server
const port = process.env.PORT || 9090
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(console.log('Connected to DB: CAR RENTAL API...'))
    app.listen(port, () => {
      console.log(`Car Rental SERVER listening on port: ${port}`);
    })
  } catch(error) {
    console.log('Server unable to connect');
  }
}

start()