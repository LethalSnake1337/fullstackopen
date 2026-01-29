const write = (level, message, ...args) => {
  console.log(`[${new Date().toISOString()}] [${level}] ${message}`, ...args)
}

module.exports = {
  info: (message, ...args) => write('INFO', message, ...args),
  failure: (message, ...args) => write('ERROR', message, ...args),
  success: (message, ...args) => write('SUCCESS', message, ...args)
}
