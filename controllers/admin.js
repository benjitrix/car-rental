const Admin = require('../models/Admin.model')
const asyncWrapper = require('../middleware/async')
const { BadRequestError } = require('../errors/')
const { UnauthenticatedError } = require('../errors/')

// register admin
const registerAdmin = (req, res, next) => {
  console.log('register user');
  const email = req.body.email

  Admin.findOne({email}, (err, doc) => {
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
        msgError: true
      }})
    } else {
      Admin.create({...req.body}, (err, doc) => {
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
            user: doc
          }})
        }
      })
    }
  })
}

// login admin
const loginAdmin = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({email})
  if (!admin) {
    throw new BadRequestError(`User with email ${email} not found`)
  }

  // compare password
  const isPasswordCorrect = await admin.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Password incorrect')
  }

  const token = admin.createJWT()
  res.status(200).json({message: {
    msgBody: `User -${admin.name}- logged in`,
    msgError: false,
    user: admin.name, 
    isAuthenticated: true, 
    role: admin.role, 
    token
  }})
})

// logout admin
const logoutUser = (req, res, next) => {

}

// authenticate admin
const authenticateAdmin = (req, res, next) => {
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

module.exports = { registerAdmin, loginAdmin, logoutUser, authenticateAdmin }