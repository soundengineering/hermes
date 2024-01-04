import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const StatsD = require('hot-shots')

const client = new StatsD({
  host: process.env.STATSD_HOST,
  globalTags: { bucket: process.env.STATSD_BUCKET, system: process.env.npm_package_name, env: process.env.NODE_ENV },
  telegraf: true
})

export const metrics = {
  count: (metric, tags) => {
    client.increment(metric, tags)
  },
  timer: (metric, time, tags) => {
    client.timing(metric, time, tags)
  },
  trackExecution: (command, method, duration, successful, extras) => {
    metrics.count('functionExecuted', { method, command, successful, ...extras })
    metrics.timer('responseTime', duration, { method, command, successful, ...extras })
  }
}
