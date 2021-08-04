import {
  ActiveSession,
  AuthProvider,
  Session,
} from "../../services/authProvider";
import { waitSeconds } from "./time";

export class FakeAuthProvider implements AuthProvider {
  private static storageKey = "__fake_auth__";

  async getCurrentSession(): Promise<Session> {
    const existingSession = localStorage.getItem(FakeAuthProvider.storageKey);
    if (existingSession) {
      await waitSeconds(0.5);
      return {
        token: existingSession,
        user: {
          email: "rusty@example.com",
          id: "a5d87881-e2c1-4d68-a932-a1e810a2d045",
          name: "Rusty Ryan",
        },
      };
    } else {
      await waitSeconds(2);
      return {
        token: null,
        user: null,
      };
    }
  }

  async signIn(): Promise<ActiveSession> {
    await waitSeconds(2);

    const token = "fake.token.123";
    localStorage.setItem(FakeAuthProvider.storageKey, token);

    return {
      token,
      user: {
        email: "rusty@example.com",
        id: "a5d87881-e2c1-4d68-a932-a1e810a2d045",
        name: "Rusty Ryan",
      },
    };
  }

  async signOut(): Promise<void> {
    localStorage.removeItem(FakeAuthProvider.storageKey);
  }
}
