import { useContext } from "react";

import { SnackContext } from "./SnackContext";

export function useSnack() {
    return useContext(SnackContext);
}
