import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://ae316a7a052d9fb64c8b33077304feed@o4509587170721792.ingest.de.sentry.io/4509587182256208", // Replace with your actual DSN
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;