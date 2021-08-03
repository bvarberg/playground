import { Consumer } from "./Consumer";
import { GlobalErrorBoundary } from "./GlobalErrorBoundary";
import { Locator, ServiceLocatorProvider } from "./packages/service-locator";
import { Service } from "./services";
import { Analytics } from "./services/analytics";
import { ErrorReporter } from "./services/errorReporter";

interface Dependencies {
  analytics: Analytics;
  errorReporter: ErrorReporter;
}

export function App({ analytics, errorReporter }: Dependencies) {
  const locator = new Locator();

  locator.register(Service.ANALYTICS, analytics);
  locator.register(Service.ERROR_REPORTER, errorReporter);

  return (
    <ServiceLocatorProvider value={locator}>
      <GlobalErrorBoundary>
        <Consumer />
      </GlobalErrorBoundary>
    </ServiceLocatorProvider>
  );
}
