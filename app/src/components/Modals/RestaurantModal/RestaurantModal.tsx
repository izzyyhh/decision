import Modal from "@components/Modals/Modal";
import { useSnack } from "@context/snackbar/useSnack";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";

import { ModalProps } from "../ModalProps";
import { CssTextField } from "../ModalTools";
import { StyledButton } from "../MoviesModal/MoviesModal.sc";

const RestaurantModal: FunctionComponent<ModalProps> = ({ open, setOpen, handleClose }) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(10);
    const [title, setTitle] = useState("");
    const { setSnack } = useSnack();
    const { t } = useTranslation();

    const submit = () => {
        if (name == "" || title == "") {
            setSnack({ message: t("modals.errors.fields"), open: true, severity: "warning" });
        } else if (amount < 5 || amount > 50) {
            setSnack({ message: t("modals.errors.amount"), open: true, severity: "warning" });
        } else {
            handleClose({ name, amount, title });
        }
    };

    return (
        <Modal open={open} setOpen={(value: boolean) => setOpen(value)}>
            <DialogTitle>{t("modals.restaurant.title")}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t("modals.restaurant.text")}</DialogContentText>
                <CssTextField
                    autoFocus
                    margin="normal"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label={t("modals.decision.title")}
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
                    label={t("modals.decision.city")}
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
                    label={t("modals.decision.amount")}
                    type="number"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <StyledButton
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    {t("modals.cancel")}
                </StyledButton>
                <StyledButton onClick={submit}>{t("modals.create")}</StyledButton>
            </DialogActions>
        </Modal>
    );
};

export default RestaurantModal;
