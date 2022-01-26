import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    p {
        font-family: ${({ theme }) => theme.typography.body2.fontFamily};
        color: ${({ theme }) => theme.palette.text.primary};
    }
    body {
        background-color: ${({ theme }) => theme.palette.neutral.light} !important;
    }
`;

export default GlobalStyle;
