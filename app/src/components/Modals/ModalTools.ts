import { Dialog, InputLabel, TextField } from "@material-ui/core";
import { styled } from "@mui/material/styles";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogTitle-root": {
        background: "#202020",
        color: "white",
    },
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
        background: "#202020",
        color: "white",
    },
    "& .MuiDialogContentText-root,& .MuiFormControl-root": {
        color: "white",
    },
    "& .MuiInputLabel-root": {
        color: "white",
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
        background: "#202020",
    },
    "& .MuiFormControl-root": {
        color: "white",
    },

    ".MuiCheck-root": {
        background: "green",
    },
    "& .MuiDialogActions-root .MuiButton-root": {
        color: "white",
    },
}));

export const CssTextField = styled(TextField)(({ theme }) => ({
    "& label.Mui-focused": {
        color: "white",
    },
    "& .MuiInputBase-input": {
        color: "white",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "red",
        },
        "&:hover fieldset": {
            borderColor: "yellow",
        },
        "&.Mui-focused fieldset": {
            borderColor: "green",
        },
    },
}));

export const CssLabel = styled(InputLabel)(({ theme }) => ({
    "& label.Mui-focused": {
        color: "white",
        borderColor: "white",
    },
    "& .MuiInputBase-input": {
        color: "white",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "red",
        },
        "&:hover fieldset": {
            borderColor: "yellow",
        },
        "&.Mui-focused fieldset": {
            borderColor: "green",
        },
    },
}));
