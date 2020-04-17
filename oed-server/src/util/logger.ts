import debug from 'debug'

export const logger = (name: string) => {
  const log = debug(name)
  console.log.bind(log)
  return log
}
