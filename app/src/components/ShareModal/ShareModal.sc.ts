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
    padding: 10px;
    background: red;
    height: max-content;
    border-radius: 7.5px;
`;
