import styled from "styled-components/macro";

export const Button = styled.button`
  font-size: 1em;
  padding: 0.25em 1em;
  margin: 1em;
  border-radius: 3px;
  color: ${(props) => props.color ?? props.theme.colors.main};
  border: 2px solid ${(props) => props.color ?? props.theme.colors.main};

  &:disabled {
    color: lightgray;
    border: 2px solid lightgray;
  }
`;

Button.defaultProps = {
  theme: {
    colors: {
      main: "#45976a",
    },
  },
};
