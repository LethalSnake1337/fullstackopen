const jwt = require('jsonwebtoken')
const Account = require('../db/Account')
const terminal = require('../adapters/console')
const config = require('../adapters/environment')

const accessLog = (request, response, next) => {
  terminal.info(`${request.method} ${request.path}`)
  if (Object.keys(request.body).length > 0) {
    terminal.info('Payload:', JSON.stringify(request.body))
  }
  next()
}

const handleNotFound = (request, response) => {
  response.status(404).json({ message: 'Endpoint does not exist' })
}

const handleException = (error, request, response, next) => {
  terminal.failure('Exception:', error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ message: 'Invalid identifier format' })
  }
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({ message: error.message })
  }
  
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ message: 'Authentication token invalid or missing' })
  }
  
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ message: 'Session has expired' })
  }

  return response.status(500).json({ message: 'Internal server error' })
}

const extractJWT = (request, response, next) => {
  const header = request.get('authorization')
  if (header?.startsWith('Bearer ')) {
    request.credentials = header.replace('Bearer ', '')
  }
  next()
}

const verifyAccount = async (request, response, next) => {
  try {
    const decoded = jwt.verify(request.credentials, config.SECRET)
    if (decoded?.id) {
      request.account = await Account.findById(decoded.id)
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  accessLog,
  handleNotFound,
  handleException,
  extractJWT,
  verifyAccount
}
