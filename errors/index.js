const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')
const CustomAPIError = require('./custom-error')

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError
}