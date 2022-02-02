import React, { FunctionComponent } from "react";

import { AddIcon } from "./LinkButton.sc";

interface IProps {
    type: "add" | undefined;
}

const Icon: FunctionComponent<IProps> = ({ type }) => {
    if (type === "add") {
        return (
            <>
                <AddIcon />
            </>
        );
    }

    return <></>;
};

export default Icon;
