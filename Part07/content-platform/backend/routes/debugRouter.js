const api = require('express').Router()
const Entry = require('../db/Entry')
const Account = require('../db/Account')

api.post('/reset', async (request, response, next) => {
  try {
    await Entry.deleteMany({})
    await Account.deleteMany({})
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = api
