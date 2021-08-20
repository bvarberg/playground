import styled from "styled-components/macro";

export const AppBar = styled.div.attrs((props) => ({
  padding: props.theme.spacing(2),
}))`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: calc(100vw - ${(props) => 2 * props.padding});
  padding: ${(props) => props.padding};
`;

AppBar.defaultProps = {
  theme: {
    spacing: (factor: number) => `${factor * 8}px`,
  },
};
