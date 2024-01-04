import * as winston from 'winston'
import { Loggly } from 'winston-loggly-bulk'

export let logger = null

const { format, createLogger, transports } = winston.default
const { timestamp, combine, errors, json } = format

const winstonTransports = [
  new transports.Console()
]

function buildLogger () {
  return createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { system: process.env.npm_package_name, environment: process.env.NODE_ENV },
    transports: winstonTransports
  })
}

if (process.env.NODE_ENV === 'production') {
  winstonTransports.push(
    new Loggly({
      token: process.env.LOGGLY_TOKEN,
      subdomain: process.env.LOGGLY_SUBDOMAIN,
      tags: ['service'],
      json: true
    })
  )
}

logger = buildLogger()
