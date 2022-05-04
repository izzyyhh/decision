import { Modal as MuiModal } from "@material-ui/core";
import styled from "styled-components";

export const Modal = styled(MuiModal)`
    width: 85vw;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 15px;
    background: #ffffff;
    height: max-content;
    border-radius: 7.5px;
`;

export const Title = styled.p`
    margin: 0;
    text-align: center;
    font-size: 22px;
`;

export const ShareBar = styled.div`
    display: flex;
    margin-top: 15px;
    justify-content: space-around;
`;

export const Links = styled.div`
    margin-top: 30px;
`;

export const Body = styled.div`
    &:focus-visible {
        outline: none;
    }
`;
