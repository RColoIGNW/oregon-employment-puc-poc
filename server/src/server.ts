import app from './app'
import log from './util/logger'

const port = process.env.PORT || 4000

const server = app.listen(port as number, () => {
  log.info('App started on port: ' + port)
})

server.on('connection', function(socket) {
  log.info("A new connection was made by a client.")
  socket.setTimeout(30 * 1000)
  // 30 second timeout. Change this as you see fit.
})

process.on('uncaughtException', (err) => {
  log.error('App Crashed')
  log.error(err)
})
