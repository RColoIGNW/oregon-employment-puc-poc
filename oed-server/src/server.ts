import app from './app'
import { logger } from './util/logger'

const log = logger('app:service')

const port = process.env.PORT || 4000

// start the app by using heroku port
app.listen(port as number, () => {
  console.log("App started on port: " + port)
})
