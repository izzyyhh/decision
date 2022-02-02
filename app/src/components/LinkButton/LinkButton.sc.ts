import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const Link = styled(RouterLink)`
    text-decoration: none;
    font-family: Roboto;
`;

export const LinkButtonContainer = styled.div`
    background-color: ${({ theme }) => theme.palette.grey[100]};
    color: black;
    font-size: 1em;
    border-radius: 3px;
    text-decoration: none;
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: bold;
    border: 0;
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
`;

export const Text = styled.span`
    margin-left: auto;
    margin-right: auto;
`;

export const AddIcon = styled(AddCircleOutlineIcon)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
`;
