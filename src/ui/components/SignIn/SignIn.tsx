import { useState } from "react";
import styled from "styled-components/macro";
import { Button } from "../../../packages/design-system";
import { useSession } from "../../authentication";

export const SignIn = () => {
  const { signIn } = useSession();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    await signIn();
  };

  return (
    <Container>
      <Button disabled={isAuthenticating} onClick={handleSignIn}>
        {isAuthenticating ? "Authenticating..." : "Sign In"}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
