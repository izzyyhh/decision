import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import { LinkButtonContainer } from "./LinkButton.sc";

interface IProps {
    link: string;
    primary?: boolean;
    icon: "add" | undefined;
    title: string;
}

const LinkButton: FunctionComponent<IProps> = ({ children, link, primary, icon, title }) => {
    return (
        <>
            <LinkButtonContainer primary={primary}>
                <div>
                    {icon === "add" && <AddCircleOutlineIcon color="secondary"></AddCircleOutlineIcon>}
                    <Link to={link} title={title}>
                        {children}
                    </Link>
                </div>
                <ArrowRightAltSharpIcon color="secondary"></ArrowRightAltSharpIcon>
            </LinkButtonContainer>
        </>
    );
};

export default LinkButton;
