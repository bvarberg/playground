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

export function App({ analytics, errorReporter, auth }: Dependencies) {
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
}

/**
 * authProvider: Non-React object that can be used to interact with the abstract
 *    authentication provider
 *
 * AuthenticationProvider: React component that adapts the authProvider for
 *    rendering + access to the current user + session inside the React tree.
 *    In other words, we're hiding authProvider, unlike the other services,
 *    because we need to expose some React state with it, and we'd rather have
 *    consumers access that part specifically.
 */
