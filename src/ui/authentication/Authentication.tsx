import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useServices } from "../../packages/service-locator";
import { ERROR_REPORTER } from "../../services";
import { AuthProvider } from "../../services/authProvider";
import { RefreshingIndicator } from "./RefreshingIndicator";
import { SessionProvider, useSession } from "./SessionContext";
import { CurrentUser } from "./types";

interface AuthenticationProps {
  auth: AuthProvider;
}

export const Authentication: FunctionComponent<AuthenticationProps> = ({
  auth,
  children,
}) => {
  const services = useServices([ERROR_REPORTER]);
  const [errorReporter] = services;
  const [isRefreshingSession, setIsRefreshingSession] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // Refresh the user's session, if possible
  useEffect(() => {
    const refreshSession = async () => {
      try {
        setIsRefreshingSession(true);
        const session = await auth.getCurrentSession();

        setCurrentUser(session.user);
      } finally {
        setIsRefreshingSession(false);
      }
    };

    refreshSession();
  }, [auth]);

  const signIn = useCallback(async () => {
    try {
      const session = await auth.signIn();
      setCurrentUser(session.user);
    } catch (error) {
      errorReporter.record(error as Error);
    }
  }, [auth, setCurrentUser, errorReporter]);

  const signOut = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (error) {
      errorReporter.record(error as Error);
    } finally {
      setCurrentUser(null);
    }
  }, [auth, setCurrentUser, errorReporter]);

  const session = useMemo(
    () => ({ currentUser, signIn, signOut }),
    [currentUser, signIn, signOut]
  );

  // Don't render while we're attempting to refresh the session.
  if (isRefreshingSession) {
    return <RefreshingIndicator />;
  }

  return <SessionProvider value={session}>{children}</SessionProvider>;
};

/**
 * Shortcut for rendering only when the user is authenticated.
 */
export const Authenticated: FunctionComponent = ({ children }) => {
  const { currentUser } = useSession();
  return currentUser ? <>{children}</> : null;
};

/**
 * Shortcut for rendering only when there is no authenticated user.
 */
export const Unauthenticated: FunctionComponent = ({ children }) => {
  const { currentUser } = useSession();
  return currentUser ? null : <>{children}</>;
};
