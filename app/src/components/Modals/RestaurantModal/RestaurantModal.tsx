import { useSnack } from "@context/snackbar/useSnack";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { FunctionComponent, useState } from "react";

import { ModalProps } from "../ModalProps";
import { BootstrapDialog, CssTextField } from "../ModalTools";



const RestaurantModal: FunctionComponent<ModalProps> = ({ open, setOpen, handleClose }) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(10);
    const [title, setTitle] = useState("");
    const { setSnack } = useSnack();

    const submit = () => {
        if (name == "" || title == "") {
            setSnack({ message: "Felder fehlen", open: true, severity: "warning" });
        } else if (amount < 5 || amount > 50) {
            setSnack({ message: "Anzahl zu groß", open: true, severity: "warning" });
        } else {
            handleClose({ name, amount, title });
        }
    };

    return (
        <div>
            <BootstrapDialog open={open} onClose={submit}>
                <DialogTitle>RestaurantModal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates occasionally.
                    </DialogContentText>
                    <CssTextField
                        autoFocus
                        margin="normal"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <CssTextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <CssTextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        label="Anzahl der Vorschläge"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={submit}>Subscribe</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default RestaurantModal;
