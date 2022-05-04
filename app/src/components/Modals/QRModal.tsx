import { Dialog, DialogContent } from "@material-ui/core";
import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
    children?: ReactNode;
    openModal: boolean;
    handleClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root:first-child": {
        padding: "10px",
    },
}));

export const CustomModal: FunctionComponent<ModalProps> = ({ children, openModal, handleClose }) => {
    return (
        <div>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openModal}>
                <DialogContent>{children}</DialogContent>
            </BootstrapDialog>
        </div>
    );
};
