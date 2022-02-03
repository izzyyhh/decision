import React, { FunctionComponent } from "react";

import Icon, { IconsTypes } from "./Icon";
import { ArrowIcon, Link, LinkButtonContainer, Text } from "./LinkButton.sc";
interface IProps {
    link?: string;
    title?: string;
    arrow: boolean;
    primary?: boolean;
    icon: IconsTypes;
    onClick?: (e: Event) => void;
    active: boolean;
}

const LinkButton: FunctionComponent<IProps> = ({ children, link, title, primary, icon, arrow, active }) => {
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
        <>
            <LinkButtonContainer active={active}>
                <Icon type={icon} />
                <Text>{children}</Text>
                {arrow && <ArrowIcon />}
            </LinkButtonContainer>
        </>
    );
};

export default LinkButton;
