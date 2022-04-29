import {
  ActiveSession,
  AuthProvider,
  Session,
} from "../../services/authProvider";
import { waitSeconds } from "./time";

export class FakeAuthProvider implements AuthProvider {
  private static STORAGE_KEY = "__fake_auth__";

  async getCurrentSession(): Promise<Session> {
    const existingSession = localStorage.getItem(FakeAuthProvider.STORAGE_KEY);
    if (existingSession) {
      await waitSeconds(0.5);
      return {
        token: existingSession,
        user: this._buildExampleUser(),
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

    const token = this._buildExampleToken();
    localStorage.setItem(FakeAuthProvider.STORAGE_KEY, token);

    return {
      token,
      user: this._buildExampleUser(),
    };
  }

  async signOut(): Promise<void> {
    localStorage.removeItem(FakeAuthProvider.STORAGE_KEY);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _buildExampleToken() {
    return "fake.token.definitely_forged";
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _buildExampleUser() {
    return {
      email: "user@example.com",
      id: "a5d87881-e2c1-4d68-a932-a1e810a2d045",
      name: "Example User",
    };
  }
}
