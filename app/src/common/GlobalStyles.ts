import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: ${({ theme }) => theme.palette.background.default};
        font-family: Open-Sans, Helvetica, Sans-Serif;
    }
`;

export default GlobalStyle;

export const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-top: 120px;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: auto;
    position: relative;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        width: ${({ theme }) => theme.breakpoints.values.sm}px;
    }
`;
