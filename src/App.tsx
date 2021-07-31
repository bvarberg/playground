import { Consumer } from "./Consumer";
import { Locator, ServiceLocatorProvider } from "./packages/service-locator";
import { Services } from "./services";
import { Analytics } from "./services/analytics";
import { ErrorReporter } from "./services/errorReporter";

interface Dependencies {
  analytics: Analytics;
  errorReporter: ErrorReporter;
}

export function App({ analytics, errorReporter }: Dependencies) {
  const locator = new Locator();

  locator.register(Services.ANALYTICS, analytics);
  locator.register(Services.ERROR_REPORTER, errorReporter);

  return (
    <ServiceLocatorProvider value={locator}>
      <Consumer />
    </ServiceLocatorProvider>
  );
}
