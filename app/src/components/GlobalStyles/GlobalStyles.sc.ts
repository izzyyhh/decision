import styled from "styled-components";

export const MobileContainer = styled.div`
<<<<<<< HEAD
=======
    background-color: ${({ theme }) => theme.palette.primary.main};
>>>>>>> add initial global styles
    display: block;
    
    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        display: none;
    }
`;

export const DesktopContainer = styled.div`
    background-color: red;
    display: none;
        
    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        display: block;
    }
`;