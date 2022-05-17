const User = require('../models/User.model')
const asyncWrapper = require('../middleware/async')
const { BadRequestError } = require('../errors/')
const { UnauthenticatedError } = require('../errors/')

const registerUser = (req, res, next) => {
  console.log('register user');
  const email = req.body.email

  User.findOne({email}, (err, doc) => {
    if (err) { 
      res.status(400).json({message: {
        msgBody: err.message,
        msgError: true,
        error: err
      }})
    } 
    else if (doc) {
      res.status(404).json({message: {
        msgBody: `User already exists`,
        msgError: true,
        userValid: false
      }})
    } else {
      User.create({...req.body}, (err, doc) => {
        if (err) { 
          res.status(400).json({message: {
            msgBody: err.message,
            msgError: true,
            error: err.name
          }})
        }
        if (doc) { 
          res.status(201).json({message: {
            msgBody: `User - ${doc.name} - created`,
            msgError: false,
            user: doc,
            userValid: true
          }})
        }
      })
    }
  })
}

// login user
const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({email})
  if (!user) {
    throw new BadRequestError(`User with email ${email} not found`)
  }

  // compare password
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Password incorrect')
  }

  const token = user.createJWT()
  res.status(200).json({message: {
    msgBody: `User -${user.name}- logged in`,
    msgError: false,
    user: user.name, 
    isAuthenticated: true, 
    role: user.role, 
    token
  }})
})

const logoutUser = (req, res, next) => {

}

const authenticateUser = (req, res, next) => {
  const { userId, name, role } = req.user
  console.log('Authenticate:', req.user);

  if (!req.user) {
    throw new UnauthenticatedError('Authentication not valid')
  }

  try {
    res.status(200).json({message: {
      msgBody: 'Authentication valid',
      msgError: false,
      isAuthenticated: true,
      user: name,
      role
    }})
  } catch (error) {
    res.status(401).json({message: {
      msgBody: 'No authorization for this request',
      msgError: true,
      isAuthenticated: false,
    }})
  }
}

module.exports = { registerUser, loginUser, logoutUser, authenticateUser }