import React, { FunctionComponent } from "react";

import Icon from "./Icon";
import { ArrowIcon, Link, LinkButtonContainer, Text } from "./LinkButton.sc";
interface IProps {
    link?: string;
    title?: string;
    arrow: boolean;
    primary?: boolean;
    icon: "add" | undefined;
    onClick?: (e: Event) => void;
    active: boolean;
}

const LinkButton: FunctionComponent<IProps> = ({ children, link, title, primary, icon, arrow, active }) => {
    if (link) {
        return (
            <>
                <Link to={link} title={title}>
                    <LinkButtonContainer>
                        <Icon type={icon} />
                        <Text>{children}</Text>
                        {arrow && <ArrowIcon />}
                    </LinkButtonContainer>
                </Link>
            </>
        );
    }
    return (
        <>
            <LinkButtonContainer>
                <LinkButtonContainer>
                    <Icon type={icon} />
                    <Text>{children}</Text>
                    {arrow && <ArrowIcon />}
                </LinkButtonContainer>
            </LinkButtonContainer>
        </>
    );
};

export default LinkButton;
