// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://91628d0338bcfbdb5c7908fe3baa6cad@o4510725652676608.ingest.us.sentry.io/4510725662048256",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii

  integrations: [Sentry.vercelAIIntegration,
  Sentry.consoleLoggingIntegration({
    levels: ["log", "warn", "error"]
  })
  ]
});
