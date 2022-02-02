import React, {FunctionComponent} from "react";
import { Link } from "react-router-dom";

import { LinkButtonContainer } from "./LinkButton.sc";

interface IProps {
    link: string;
    primary?: boolean;
    icon: "add" | undefined;
}

const LinkButton: FunctionComponent <IProps> = ({ children, link, primary, icon }) => {
    return (
        <>
            <LinkButtonContainer>
                <Link to={link} >{children}</Link>
            </LinkButtonContainer>
        </>
    );
};

export default LinkButton;
