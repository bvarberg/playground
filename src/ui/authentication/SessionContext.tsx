import { createContext, useContext } from "react";
import { Session } from "./types";

export const SessionContext = createContext<Session | undefined>(undefined);
SessionContext.displayName = "SessionContext";

export const SessionProvider = SessionContext.Provider;

/**
 * Access the session to get the current user, and functions for signing in or
 * out.
 */
export const useSession = () => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Must be called within a SessionProvider");
  }

  return session;
};
