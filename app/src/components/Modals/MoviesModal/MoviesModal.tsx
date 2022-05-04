import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { FunctionComponent } from "react";

import { ModalProps } from "../ModalProps";

const MoviesModal: FunctionComponent<ModalProps> = ({ open, setOpen, handleClose }) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={() => {
                    handleClose("kleiner");
                }}
            >
                <DialogTitle>MovieModal</DialogTitle>
                <DialogContent>
                    <DialogContentText>MovieModal</DialogContentText>
                    <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose("MOVIES");
                        }}
                    >
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MoviesModal;
