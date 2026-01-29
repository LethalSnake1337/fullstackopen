const api = require('express').Router()
const bcrypt = require('bcrypt')
const Account = require('../db/Account')

api.get('/', async (request, response, next) => {
  try {
    const items = await Account
      .find({})
      .populate('entries', { heading: 1, writer: 1, resource: 1 })
    response.json(items)
  } catch (error) {
    next(error)
  }
})

api.post('/', async (request, response, next) => {
  try {
    const { login, fullname, password } = request.body

    if (!password || password.length < 3) {
      return response.status(400).json({
        message: 'Password must be at least 3 characters long'
      })
    }

    const rounds = 10
    const encrypted = await bcrypt.hash(password, rounds)

    const account = new Account({
      login,
      fullname,
      hashedpass: encrypted
    })

    const created = await account.save()
    response.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

module.exports = api
