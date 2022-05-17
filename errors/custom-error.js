class CustomAPIError extends Error {
  constructor(message, statusCode, errorStatus) {
    super (message)
    this.statusCode = statusCode
    this.errorStatus = errorStatus
  }
}

module.exports = CustomAPIError