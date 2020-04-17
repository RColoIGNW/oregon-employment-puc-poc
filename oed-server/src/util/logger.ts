// import debug from 'debug'

export const logger = (name: string) => { // TODO: use a better logger
  // const log = debug(name)
  // console.log.bind(log)
  return console.log
}
