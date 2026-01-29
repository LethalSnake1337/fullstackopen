require('dotenv').config()

module.exports = {
  MONGO_URL: process.env.MONGODB_URI,
  SECRET: process.env.SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3001
}
