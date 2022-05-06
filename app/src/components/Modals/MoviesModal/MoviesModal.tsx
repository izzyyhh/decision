import { useSnack } from "@context/snackbar/useSnack";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";

import Modal from "../Modal";
import { ModalProps } from "../ModalProps";
import { CssTextField } from "../ModalTools";
import { ModalInput, StyledButton, StyledFormControl, Title } from "./MoviesModal.sc";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            background: "darkgrey",
            color: "white",
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    const notselected = personName.indexOf(name) === -1;
    return {
        fontWeight: notselected ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        background: notselected ? "darkgrey" : "black",
        color: notselected ? "black" : "white",
    };
}

const MoviesModal: FunctionComponent<ModalProps> = ({ open, setOpen, handleClose, options }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [amount, setAmount] = useState(10);
    const [title, setTitle] = useState("");
    const { setSnack } = useSnack();
    const [personName, setPersonName] = useState<string[]>([]);
    const submit = () => {
        if (title == "") {
            setSnack({ message: t("modals.errors.fields"), open: true, severity: "warning" });
        } else if (amount < 5 || amount > 50) {
            setSnack({ message: t("modals.errors.amount"), open: true, severity: "warning" });
        } else {
            handleClose({ amount, title, personName });
        }
    };

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <Modal open={open} setOpen={(value: boolean) => setOpen(value)}>
            <Title>{t("modals.movie.title")}</Title>
            <DialogContent>
                <DialogContentText>{t("modals.movie.text")}</DialogContentText>
                <ModalInput update={(value) => setTitle(value)} label="Title" />
                {options && (
                    <StyledFormControl fullWidth>
                        <InputLabel>Genres</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {options.map((name: string) => (
                                <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </StyledFormControl>
                )}
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
                <StyledButton
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Cancel
                </StyledButton>
                <StyledButton onClick={submit}>Subscribe</StyledButton>
            </DialogActions>
        </Modal>
    );
};

export default MoviesModal;
