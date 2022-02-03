import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Link as RouterLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Link = styled(RouterLink)`
    text-decoration: none;
    font-family: Roboto;
`;

interface ILinkButtonContainer {
    active: boolean;
}

export const LinkButtonContainer = styled.div<ILinkButtonContainer>`
    cursor: ${({ active }) => (active ? "pointer" : "default")};
    color: black;
    font-size: 1em;
    border-radius: 3px;
    text-decoration: none;
    padding-top: 15px;
    padding-bottom: 15px;
    font-weight: bold;
    border: 0;
    display: flex;
    margin-bottom: 30px;
    position: relative;
    -webkit-box-shadow: 0px 0px px 2px rgba(0, 0, 0, 0.49);
    box-shadow: 0px 3px 8px 2px rgba(0, 0, 0, 0.49);
    background-color: white;
    transition: background-color 0.5s ease-in;
    opacity: ${({ active }) => (active ? 1 : 0.3)};

    ${({ active }) =>
        active &&
        css`
            &:hover {
                background-color: #dfdfdf;
            }
        `}
`;

export const Text = styled.span`
    margin-left: auto;
    margin-right: auto;
`;

export const ArrowIcon = styled(ArrowRightAltIcon)`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    color: #807dff;
`;
