const mongoose = require('mongoose')

const initialize = async (connectionString) => {
  mongoose.set('strictQuery', false)
  return mongoose.connect(connectionString)
}

module.exports = {
  initialize
}
