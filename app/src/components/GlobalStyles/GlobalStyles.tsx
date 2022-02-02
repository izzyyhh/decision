import React, { FunctionComponent } from "react";

import { DesktopContainer, MobileContainer } from "./GlobalStyles.sc";

const GlobalStyles: FunctionComponent = ({ children }) => {
    return (
        <>
            <MobileContainer>{children}</MobileContainer>
            <DesktopContainer>
                <h1>This page only works on mobile devices. Please change to mobile device!</h1>
            </DesktopContainer>
        </>
    );
};

export default GlobalStyles;
