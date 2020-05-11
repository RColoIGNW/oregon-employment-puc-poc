import fs from 'fs'

import bunyan, { LogLevel } from 'bunyan'

const filePath =  process.env.NODE_ENV === 'production'
? '/var/log/OregonState-PUA-BFF.log'
: `${__dirname}/../../logs/OregonState-PUA-BFF.log`

const logDir = `${__dirname}/../../logs/`

// create directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const log = bunyan.createLogger({
  name: 'OregonState-PUA-BFF:App',
  level: (process.env.LOG_LEVEL as LogLevel) || 'info',
  streams: [
    {
      stream: process.stdout,
    },
    {
      type: 'rotating-file',
      path: filePath,
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    },
  ],
})

export default log
