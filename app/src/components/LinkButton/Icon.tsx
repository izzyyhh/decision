import React, { FunctionComponent } from "react";

import { AddIcon, BinarIcon, CalenderIcon, ScaleIcon, TinderIcon } from "./Icon.sc";

export type IconsTypes = "add" | "calender" | "tinder" | "scale" | "binar" | undefined;
interface IProps {
    type: IconsTypes;
}

const Icon: FunctionComponent<IProps> = ({ type }) => {
    if (type === "add") {
        return <AddIcon />;
    }

    if (type === "calender") {
        return <CalenderIcon />;
    }

    if (type === "tinder") {
        return <TinderIcon />;
    }

    if (type === "scale") {
        return <ScaleIcon />;
    }

    if (type === "binar") {
        return <BinarIcon />;
    }

    return <></>;
};

export default Icon;
