import { Analytics } from "./services/analytics";
import { ErrorReporter } from "./services/errorReporter";

/*
 * The service keys that are expected to be registered with the service locator.
 */
export const ANALYTICS = "analytics";
export const ERROR_REPORTER = "errorReporter";

/**
 * Uses Module Augmentation so that utilities from "service-locator" can provide
 * types for the services that are *expected* to be registered.
 *
 * NOTE: If a service is not registered at the time it is accessed, the locator
 * will throw an error.
 *
 * @example
 * locator.register('api', apiClient) // "apiClient" must be Type: APIClient
 * const api = locator.resolve('api') // Type: APIClient
 */
declare module "./packages/service-locator" {
  interface ServiceMap {
    [ANALYTICS]: Analytics;
    [ERROR_REPORTER]: ErrorReporter;
  }
}
