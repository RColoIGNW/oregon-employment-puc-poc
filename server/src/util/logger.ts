import bunyan, { LogLevel } from 'bunyan'

const log = bunyan.createLogger({
  name: 'OregonState-PUA-BFF:App',
  level: (process.env.LOG_LEVEL as LogLevel) || 'info',
  streams: [
    {
      stream: process.stdout,
    },
    {
      type: 'rotating-file',
      path:
        process.env.NODE_ENV === 'production'
          ? '/var/log/OregonState-PUA-BFF.log'
          : './logs/OregonState-PUA-BFF.log',
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    },
  ],
})

export default log
