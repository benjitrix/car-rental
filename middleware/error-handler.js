const CustomAPIError = require("../errors/custom-error")
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({message: {
      msgBody: err.message,
      msgError: err.errorStatus
    }})
  }
  
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({message: {
      msgBody: "Something went wrong, please try again",
      msgError: true,
      error: err.message
    }})
}

module.exports = errorHandlerMiddleware