import React, { FunctionComponent } from "react";

import { AddIcon, BinarIcon, CalenderIcon, ScaleIcon, ShareIcon, TinderIcon, VoteIcon } from "./Icon.sc";

export type IconsTypes = "add" | "calender" | "tinder" | "scale" | "binar" | "vote" | "share" | undefined;
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

    if (type === "vote") {
        return <VoteIcon />;
    }

    if (type === "share") {
        return <ShareIcon />;
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
