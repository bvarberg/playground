interface User {
  email: string;
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

export interface AuthProvider extends AuthObservable {
  getCurrentSession(): Promise<Session>;
  signIn(): Promise<ActiveSession>;
  signOut(): Promise<void>;
}

export interface AuthObservable {
  subscribe(observer: AuthObserver): AuthSubscription;
}

export interface AuthObserver {
  complete(): void;
  error(error: Error): void;
  next(event: AuthEvent): void;
}

export interface AuthSubscription {
  unsubscribe(): void;
}

export type AuthEvent = SignInEvent | SignOutEvent;

export interface SignInEvent {
  payload: {
    user: User;
  };
  type: "signIn";
}

export interface SignOutEvent {
  type: "signOut";
}
