import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link as RouterLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Link = styled(RouterLink)`
    text-decoration: none;
`;

interface ILinkButtonContainer {
    active: boolean;
    primary: boolean;
    arrow: boolean;
}

export const LinkButtonContainer = styled.div<ILinkButtonContainer>`
    cursor: ${({ active }) => (active ? "pointer" : "default")};
    color: black;
    border-radius: 7.5px;
    text-decoration: none;
    padding-top: 7.5px;
    padding-bottom: 7.5px;
    border: 0;
    display: flex;
    margin-bottom: 15px;
    position: relative;
    background-color: ${({ primary, theme }) => (primary ? theme.palette.primary.light : theme.palette.background.paper)};
    transition: background-color 0.5s ease-in;
    opacity: ${({ active }) => (active ? 1 : 0.7)};
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
    font-size: 16px;
    letter-spacing: 0.05em;
    line-height: 25px;
    color: ${({ primary, theme }) => (primary ? theme.palette.primary.dark : theme.palette.primary.light)};
`;

export const ArrowIcon = styled(NavigateNextIcon)<ILinkButtonContainer>`
    margin-top: auto;
    margin-bottom: auto;
    color: ${({ primary, theme }) => (primary ? theme.palette.primary.dark : theme.palette.primary.light)};
`;
