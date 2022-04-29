import { User } from "../../services/authProvider";

export interface Session {
  currentUser: CurrentUser | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export type CurrentUser = User;
