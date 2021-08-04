import { useState } from "react";
import { useSession } from "../../lib/authentication";

export function SignIn() {
  const { signIn } = useSession();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    await signIn();
  };

  return (
    <button disabled={isAuthenticating} onClick={handleSignIn}>
      {isAuthenticating ? "Authenticating..." : "Sign In"}
    </button>
  );
}
