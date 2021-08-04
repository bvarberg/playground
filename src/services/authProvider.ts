export interface User {
  email: string;
  id: string;
  name: string;
}

export type Session = ActiveSession | NullSession;

export interface ActiveSession {
  token: string;
  user: User;
}

export interface NullSession {
  token: null;
  user: null;
}

export interface AuthProvider {
  getCurrentSession(): Promise<Session>;
  signIn(): Promise<ActiveSession>;
  signOut(): Promise<void>;
}
