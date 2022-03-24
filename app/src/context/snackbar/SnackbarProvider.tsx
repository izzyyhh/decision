import React, { FunctionComponent, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { SnackContext } from "./SnackContext";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarProvider: FunctionComponent = ({ children }) => {
    const [snack, setSnack]: any = useState({ message: "", open: false });

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setSnack({ open: false, message: snack.message, severity: snack.severity });
    };

    return (
        <SnackContext.Provider value={{ snack, setSnack }}>
            {children}
            <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snack.severity != undefined ? snack.severity : "info"} sx={{ width: "100%" }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </SnackContext.Provider>
    );
};
