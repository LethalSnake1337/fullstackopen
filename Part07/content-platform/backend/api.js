const express = require('express')
const cors = require('cors')
const database = require('./db/connection')
const terminal = require('./adapters/console')
const articlesHandler = require('./routes/articlesRouter')
const accountsHandler = require('./routes/accountsRouter')
const authHandler = require('./routes/authRouter')
const debugHandler = require('./routes/debugRouter')
const requestPipeline = require('./handlers/middlewareChain')

const config = require('./adapters/environment')

const app = express()

// DB connection
database.initialize(config.MONGO_URL)
  .then(() => terminal.info('Database synchronized'))
  .catch((error) => terminal.failure('Database sync failed:', error.message))

// Middleware stack
app.use(cors())
app.use(express.json())
app.use(requestPipeline.accessLog)
app.use(requestPipeline.extractJWT)

// Routes
app.use('/api/articles', articlesHandler)
app.use('/api/accounts', accountsHandler)
app.use('/api/auth', authHandler)

if (config.NODE_ENV === 'test') {
  app.use('/api/debug', debugHandler)
}

app.use(requestPipeline.handleNotFound)
app.use(requestPipeline.handleException)

module.exports = app
