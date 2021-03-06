import React, { FunctionComponent } from "react";

import { ArrowIcon, Link, LinkButtonContainer, Text } from "./LinkButton.sc";
interface IProps {
    link?: string;
    title?: string;
    primary?: boolean;
    active: boolean;
    arrow?: boolean;
    classProp?: string;
    onClick?: () => void;
}

const LinkButton: FunctionComponent<IProps> = ({ children, link, title, primary = true, active, arrow = false, classProp = "", onClick }) => {
    if (link && active) {
        return (
            <>
                <Link to={link} title={title}>
                    <LinkButtonContainer className={classProp} active={active} primary={primary} arrow={arrow}>
                        <Text active={active} primary={primary} arrow={arrow}>
                            {children}
                        </Text>
                        {arrow && <ArrowIcon active={active} primary={primary} arrow={arrow} />}
                    </LinkButtonContainer>
                </Link>
            </>
        );
    }
    return (
        <LinkButtonContainer className={classProp} active={active} onClick={onClick} primary={primary} arrow={arrow}>
            <Text active={active} primary={primary} arrow={arrow}>
                {children}
            </Text>
            {arrow && <ArrowIcon active={active} primary={primary} arrow={arrow} />}
        </LinkButtonContainer>
    );
};

export default LinkButton;
