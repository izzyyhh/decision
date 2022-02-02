import React, { FunctionComponent } from "react";

import Icon from "./Icon";
import { Link, LinkButtonContainer, Text } from "./LinkButton.sc";
interface IProps {
    link?: string;
    title?: string;
    primary?: boolean;
    icon: "add" | undefined;
    onClick?: (e: Event) => void;
}

const LinkButton: FunctionComponent<IProps> = ({ children, link, title, primary, icon }) => {
    if (link) {
        return (
            <>
                <Link to={link} title={title}>
                    <LinkButtonContainer>
                        <Icon type={icon} />
                        <Text>{children}</Text>
                    </LinkButtonContainer>
                </Link>
            </>
        );
    }
    return (
        <>
            <LinkButtonContainer>hello world</LinkButtonContainer>
        </>
    );
};

export default LinkButton;
