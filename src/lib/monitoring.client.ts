import * as Sentry from "@sentry/react";

let clientMonitoringInitialized = false;

export function initClientMonitoring() {
  if (clientMonitoringInitialized) return;

  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
  });

  clientMonitoringInitialized = true;
}
