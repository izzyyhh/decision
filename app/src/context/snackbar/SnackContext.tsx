import { createContext } from "react";

type Snack = {
    message: string;
    open: boolean;
    severity?: "info" | "success" | "warning" | "error";
};

interface ISnackContext {
    snack: Snack;
    setSnack: (snack: Snack) => void;
}

export const SnackContext = createContext<ISnackContext>({
    snack: { message: "Snackbar op", open: false, severity: "info" },
    setSnack: (snack: Snack) => {},
});
