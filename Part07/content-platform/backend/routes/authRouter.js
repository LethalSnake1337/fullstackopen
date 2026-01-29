const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const api = require('express').Router()
const Account = require('../db/Account')
const config = require('../adapters/environment')

api.post('/', async (request, response, next) => {
  try {
    const { login, password } = request.body

    const account = await Account.findOne({ login })
    const isValid = account === null ? false : await bcrypt.compare(password, account.hashedpass)

    if (!(account && isValid)) {
      return response.status(401).json({
        message: 'Invalid credentials'
      })
    }

    const payload = {
      login: account.login,
      id: account._id
    }

    const token = jwt.sign(payload, config.SECRET, {
      expiresIn: 60 * 60
    })

    response
      .status(200)
      .send({ token, login: account.login, fullname: account.fullname })
  } catch (error) {
    next(error)
  }
})

module.exports = api
