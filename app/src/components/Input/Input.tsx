import React, { FunctionComponent } from "react";

import { TextField } from "./Input.sc";

interface Props {
    label: string;
    update: (value: string) => void;
}

const Input: FunctionComponent<Props> = ({ label, update }) => {
    return (
        <>
            <TextField label={label} onChange={(event) => update(event.target.value)} />
        </>
    );
};

export default Input;
