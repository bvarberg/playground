import { GlobalErrorBoundary } from "./GlobalErrorBoundary";
import { CommandButton } from "./components/CommandButton";
import { CurrentUserDetails } from "./components/CurrentUserDetails";
import { SignIn } from "./components/SignIn";
import {
  Authenticated,
  Authentication,
  Unauthenticated,
} from "./lib/authentication";
import { Locator, ServiceLocatorProvider } from "./packages/service-locator";
import { Service } from "./services";
import { Analytics } from "./services/analytics";
import { AuthProvider } from "./services/authProvider";
import { ErrorReporter } from "./services/errorReporter";

interface Dependencies {
  analytics: Analytics;
  auth: AuthProvider;
  errorReporter: ErrorReporter;
}

export const App = ({ analytics, errorReporter, auth }: Dependencies) => {
  const locator = new Locator();

  locator.register(Service.ANALYTICS, analytics);
  locator.register(Service.ERROR_REPORTER, errorReporter);

  return (
    <ServiceLocatorProvider value={locator}>
      <GlobalErrorBoundary>
        <Authentication auth={auth}>
          <Authenticated>
            <CurrentUserDetails />
            <CommandButton />
            <p>Other features that require authentication go here.</p>
          </Authenticated>
          <Unauthenticated>
            <SignIn />
          </Unauthenticated>
        </Authentication>
      </GlobalErrorBoundary>
    </ServiceLocatorProvider>
  );
};
