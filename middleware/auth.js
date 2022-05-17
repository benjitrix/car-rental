const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require("../errors")

const authorizeUser = (req, res, next) =>{
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Token not provided')
  }

  const token = authHeader.split(' ')[1]
  console.log("Car Rental token: ", token);

  try {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}`)

    // attach user object to routes
    req.user = { userId: payload.userId, name: payload.name, role: payload.role}
    console.log('Req User: ', req.user);
    next()
  } catch (error) {
    return new UnauthenticatedError('No authorization to access this route')
  }
}

module.exports = authorizeUser