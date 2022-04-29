import styled, { keyframes } from "styled-components/macro";

export const RefreshingIndicator = () => {
  return (
    <Container>
      <Scale>🛂</Scale>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: gray;
`;

const scale = keyframes`
  from {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
`;

const Scale = styled.div`
  animation: ${scale} 2s linear infinite;
  font-size: 2rem;
`;
