import app from './app'
import log from './util/logger'

const port = process.env.PORT || 4000

// start the app by using heroku port
app.listen(port as number, () => {
  log.info('App started on port: ' + port)
})
