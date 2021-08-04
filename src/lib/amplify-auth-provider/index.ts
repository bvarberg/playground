import Amplify, { Auth } from "aws-amplify";
import {
  ActiveSession,
  AuthProvider,
  Session,
} from "../../services/authProvider";

/**
 * Unused and broken!
 *
 * Just starting to explore connecting a real provider to the AuthProvider
 * service concept.
 *
 * @deprecated
 */
export class AmplifyAuthProvider implements AuthProvider {
  constructor(awsConfig: unknown) {
    /*
     * It seems safe to call this multiple times (e.g., in other service
     * constructors, an adapter that wraps Amplify's GraphQL client for APIs...)
     */

    Amplify.configure({
      Auth: {},
    });
  }

  getCurrentSession(): Promise<Session> {
    throw new Error("Method not implemented.");
  }

  async signIn(): Promise<ActiveSession> {
    await Auth.federatedSignIn();

    /*
     * TODO: Maybe after this, the user is authenticated, and we can get their
     * session out of the Auth object?
     *
     * I'm not really sure how the Amplify library works in this case...
     */

    const user = await Auth.currentAuthenticatedUser();

    /*
     * Here is where a validation utility might step in to make sure the value
     * from the 3rd-party can be decoded into the shape expected by the
     * interface.
     */

    const decodedUser = user;

    return {
      token: "cognitoToken:...",
      user: decodedUser,
    };
  }

  async signOut(): Promise<void> {
    await Auth.signOut();
  }
}
