import * as Sentry from '@sentry/node'

export default () => {
  const useSentry = process.env.SENTRY_PUBLIC_KEY && process.env.SENTRY_SECRET_KEY && process.env.SENTRY_PROJECT_ID
  if (useSentry && ['staging', 'production'].includes(process.env.NODE_ENV)) {
    Sentry.init({
      dsn: `https://${process.env.SENTRY_PUBLIC_KEY}@${process.env.SENTRY_SECRET_KEY}.ingest.sentry.io/${process.env.SENTRY_PROJECT_ID}`,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV
    })
  }
}
