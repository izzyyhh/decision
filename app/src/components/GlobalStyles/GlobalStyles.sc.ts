import styled from "styled-components";

export const MobileContainer = styled.div`
    background-color: ${({ theme }) => theme.palette.primary.main};
    display: block;
    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        display: none;
    }
    background-color: white;
`;

export const DesktopContainer = styled.div`
    display: none;
    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        display: block;
        width: ${({ theme }) => theme.breakpoints.values.sm}px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
    }
`;
