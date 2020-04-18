require('dotenv').config({
  path: `${__dirname}/../.env`,
})

import bodyParser from 'body-parser'
import cors, { CorsOptionsDelegate } from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import routes from './routes'

const app = express()
const router = express.Router()

const headers1 = 'Origin, X-Requested-With, Content-Type, Accept'
const headers2 =
  'Authorization, Access-Control-Allow-Credentials, x-access-token'
const whitelist = [process.env.CLIENT_URL]

const corsOptionsDelegate: CorsOptionsDelegate = (req: Request, callback) => {
  let corsOptions
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else if (process.env.NODE_ENV === 'production') {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

// For security reasons - don't tell users details about this web app in the headers
app.disable('x-powered-by')

// setup body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Use express backend routes
const clientHeaderOrigin = process.env.CLIENT_URL
app.use(cors(corsOptionsDelegate))

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin
  if (whitelist.indexOf(origin as string) > -1) {
    res.header('Access-Control-Allow-Origin', origin)
  } else {
    res.header('Access-Control-Allow-Origin', clientHeaderOrigin)
  }

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PATCH, OPTIONS, PUT'
  )
  res.header('Access-Control-Allow-Headers', `${headers1},${headers2}`)
  res.header('Access-Control-Allow-Credentials', 'true')

  next()
})

app.get('/', (_, res: Response) => {
  return res.status(200).json({
    message: 'Api Server!',
    statusCode: 200,
  })
})

// Add API Routes
app.use('/api', router)

routes(router)

app.get('*', (_, res: Response) => {
  return res.status(404).json({
    statusCode: 404,
    message: 'Not Found',
  })
})

export default app
