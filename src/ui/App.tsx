import { Locator, ServiceLocatorProvider } from "../packages/service-locator";
import { ANALYTICS, ERROR_REPORTER } from "../services";
import { Analytics } from "../services/analytics";
import { AuthProvider } from "../services/authProvider";
import { ErrorReporter } from "../services/errorReporter";
import { GlobalErrorBoundary } from "./GlobalErrorBoundary";
import {
  Authenticated,
  Authentication,
  Unauthenticated,
} from "./authentication";
import { CommandButton } from "./components/CommandButton";
import { CurrentUserDetails } from "./components/CurrentUserDetails";
import { SignIn } from "./components/SignIn";
import "./reset.css";

interface Dependencies {
  analytics: Analytics;
  auth: AuthProvider;
  errorReporter: ErrorReporter;
}

export const App = ({ analytics, errorReporter, auth }: Dependencies) => {
  const locator = new Locator();
  locator.register(ANALYTICS, analytics);
  locator.register(ERROR_REPORTER, errorReporter);

  return (
    <ServiceLocatorProvider value={locator}>
      <GlobalErrorBoundary>
        <Authentication auth={auth}>
          <Authenticated>
            <CurrentUserDetails />
            <CommandButton />
          </Authenticated>
          <Unauthenticated>
            <SignIn />
          </Unauthenticated>
        </Authentication>
      </GlobalErrorBoundary>
    </ServiceLocatorProvider>
  );
};
