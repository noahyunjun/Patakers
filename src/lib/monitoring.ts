import * as Sentry from "@sentry/node";

let serverMonitoringInitialized = false;

function initServerMonitoring() {
  if (serverMonitoringInitialized) return;

  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? "development",
    tracesSampleRate: 0.1,
  });

  serverMonitoringInitialized = true;
}

export function captureServerError(
  error: unknown,
  context?: Record<string, unknown>,
) {
  initServerMonitoring();
  if (!process.env.SENTRY_DSN) return;

  const normalizedError =
    error instanceof Error ? error : new Error("Unknown server error");

  Sentry.withScope((scope) => {
    if (context) scope.setContext("context", context);
    Sentry.captureException(normalizedError);
  });
}
