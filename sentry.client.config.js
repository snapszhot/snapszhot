// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
    dsn:
        SENTRY_DSN ||
        'https://05148d8f39da4bf586424fb058531e34@o1421618.ingest.sentry.io/6767545',
    tracesSampleRate: 1.0,
    tunnel: '/api/tunnel',
})
