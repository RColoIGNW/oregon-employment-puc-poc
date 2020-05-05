import app from './app'
import log from './util/logger'

const port = process.env.PORT || 4000

app.listen(port as number, () => {
  log.info('App started on port: ' + port)
})

process.on('uncaughtException', (err) => {
  log.error('App Crashed')
  log.error(err)
})
