import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link as RouterLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Link = styled(RouterLink)`
    text-decoration: none;
    font-family: Roboto;
`;

interface ILinkButtonContainer {
    active: boolean;
    primary: boolean;
    arrow: boolean;
}

export const LinkButtonContainer = styled.div<ILinkButtonContainer>`
    cursor: ${({ active }) => (active ? "pointer" : "default")};
    color: black;
    font-size: 1em;
    border-radius: 22px;
    text-decoration: none;
    padding-top: 15px;
    padding-bottom: 15px;
    font-weight: bold;
    border: 0;
    display: flex;
    margin-bottom: 15px;
    position: relative;
    background-color: ${({ primary, theme }) => (primary ? theme.palette.primary.main : theme.palette.secondary.main)};
    transition: background-color 0.5s ease-in;
    opacity: ${({ active }) => (active ? 1 : 0.3)};
    padding-left: 15px;
    padding-right: 15px;
    width: calc(100% - 30px);
    justify-content: ${({ arrow }) => (arrow ? "space-between" : "center")};

    ${({ active }) =>
        active &&
        css`
            &:hover {
                background-color: #dfdfdf;
            }
        `}
`;

export const Text = styled.span<ILinkButtonContainer>`
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ primary, theme }) => (primary ? theme.palette.primary.dark : theme.palette.primary.light)};
`;

export const ArrowIcon = styled(NavigateNextIcon)<ILinkButtonContainer>`
    margin-top: auto;
    margin-bottom: auto;
    color: ${({ primary, theme }) => (primary ? theme.palette.primary.dark : theme.palette.primary.light)};
`;
