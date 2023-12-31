// import aws sdk v3 for parameter store
import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm'
import { MongooseDbClass } from './db/index.mjs'
import { verifyJWT, signJWT, findChannelAndRole, verifyRole } from './jwt.lib.mjs'
import initSentry from './sentry.js'
initSentry()

export * as getRandom from './getRandom.js'
export * as networking from './networking.js'
export { callService } from './networking.js'
export { logger } from './logging.js'
export { metrics } from './metrics.js'
export { default as sanitise } from './sanitise.js'

async function loadParams () {
  // if running locally, load environment variables from .env file
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'jest') {
    console.log('loading environment variables from .env file')
    return Promise.resolve()
  }

  // read params from parameter store and load into environment variables
  console.log('loading environment variables from parameter store')
  const ssmClient = new SSMClient({ region: process.env.AWS_REGION })
  const command = new GetParametersByPathCommand({
    Path: process.env.PARAMETER_STORE_PATH,
    WithDecryption: true,
    Recursive: true
  })

  const data = await ssmClient.send(command)
  data.Parameters.forEach((param) => {
    const env = JSON.parse(param.Value)
    // for each parameter loaded, set an environment variable
    for (const key in env) {
      process.env[key] = env[key]
    }
  })
  return data
}

export default {
  MongooseDbClass,
  loadParams,
  verifyJWT,
  signJWT,
  verifyRole,
  findChannelAndRole
}
