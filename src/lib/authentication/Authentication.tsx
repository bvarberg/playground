import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthProvider } from "../../services/authProvider";
import { SessionContext, useSession } from "./SessionContext";
import { CurrentUser } from "./types";

interface AuthenticationProps {
  auth: AuthProvider;
}

export const Authentication: FunctionComponent<AuthenticationProps> = ({
  auth,
  children,
}) => {
  const [isRefreshingSession, setIsRefreshingSession] =
    useState<boolean>(false);
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
      // TODO: Maybe there is something to do if there's a specific error.
    }
  }, [auth, setCurrentUser]);

  const signOut = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (error) {
      // TODO: Maybe there is something to do if there's a specific error?
    } finally {
      setCurrentUser(null);
    }
  }, [auth, setCurrentUser]);

  const session = useMemo(
    () => ({ currentUser, signIn, signOut }),
    [currentUser, signIn, signOut]
  );

  // Don't render while we're attempting to refresh the session.
  if (isRefreshingSession) {
    return <div>Attempting to refresh session...</div>;
  }

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
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
