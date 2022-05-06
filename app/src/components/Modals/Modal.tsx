import { Modal as MuiModal } from "@material-ui/core";
import React, { FunctionComponent, ReactElement, ReactNode } from "react";
import styled from "styled-components";

interface Props {
    children: ReactElement | ReactNode;
    open: boolean;
    setOpen: (value: boolean) => void;
}

const Modal: FunctionComponent<Props> = ({ children, open, setOpen }) => {
    return (
        <>
            <ModalWrapper open={open} onClose={() => setOpen(false)} disableEnforceFocus>
                <Body>{children}</Body>
            </ModalWrapper>
        </>
    );
};

export default Modal;

const ModalWrapper = styled(MuiModal)`
    width: 85vw;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 15px;
    background: #747474;
    height: max-content;
    border-radius: 7.5px;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        width: 525px;
    }
`;

const Body = styled.div`
    &:focus-visible {
        outline: none;
    }
`;
