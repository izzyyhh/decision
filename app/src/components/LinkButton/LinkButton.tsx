import React, { FunctionComponent } from "react";

import { LinkButtonContainer } from "./LinkButton.sc";

import Icon, { IconsTypes } from "./Icon";
import { ArrowIcon, Link, LinkButtonContainer, Text } from "./LinkButton.sc";
interface IProps {
    link?: string;
    title?: string;
    arrow: boolean;
    primary?: boolean;
    icon: IconsTypes;
    active: boolean;
    onClick?: () => void;
}

const LinkButton: FunctionComponent<IProps> = ({ children, link, title, primary, icon, arrow, active, onClick }) => {
    if (link && active) {
        return (
            <>
                <Link to={link} title={title}>
                    <LinkButtonContainer active={active}>
                        <Icon type={icon} />
                        <Text>{children}</Text>
                        {arrow && <ArrowIcon />}
                    </LinkButtonContainer>
                </Link>
            </>
        );
    }
    return (
        <LinkButtonContainer active={active} onClick={onClick}>
            <Icon type={icon} />
            <Text>{children}</Text>
            {arrow && <ArrowIcon />}
        </LinkButtonContainer>
    );
};

export default LinkButton;
