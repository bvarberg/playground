import styled from "styled-components/macro";

export const AppBar = styled.div.attrs((props) => ({
  margin: props.theme.spacing(2),
}))`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: calc(100vw - ${(props) => 2 * props.margin});
  margin: ${(props) => props.margin};
`;

AppBar.defaultProps = {
  theme: {
    spacing: (factor: number) => `${factor * 8}px`,
  },
};
