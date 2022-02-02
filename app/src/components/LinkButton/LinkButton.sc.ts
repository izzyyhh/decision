import styled from "styled-components";

export const LinkButtonContainer = styled.button`

    background-color: ${({ theme }) => theme.palette.primary.main }
    color: ${({theme}) => theme.palette.getContrastText(theme.palette.primary.main)}
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    text-decoration: none;
    width: 80%;
`;