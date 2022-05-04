import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction as MuiBottomNavigationAction } from "@material-ui/core";
import styled from "styled-components";

export const MenuWrapper = styled.div`
    background-color: #191a1c;
`;

export const BottomNavigation = styled(MuiBottomNavigation)`
    && {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        height: 75px;
        background: #191a1c;
        border-top: 1px solid #292929;
        justify-content: space-evenly;
        margin-left: auto;
        margin-right: auto;
        max-width: 900px;
        z-index: 100;

        @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
            height: 100px;
            font-size: 30px;
        }
    }
`;

export const BottomNavigationAction = styled(MuiBottomNavigationAction)`
    && {
        svg {
            width: 30px;
            height: 30px;

            @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
                width: 30px;
                height: 30px;
            }
        }

        .MuiBottomNavigationAction-label {
            font-size: 12px;

            @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
                font-siez: 16px;
            }
        }
    }
`;
