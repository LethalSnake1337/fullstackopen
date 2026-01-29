const app = require('./api.js')
const config = require('./adapters/environment')
const terminal = require('./adapters/console')

const PORT = config.PORT

app.listen(PORT, () => {
  terminal.success(`Service online at port ${PORT}`)
})
