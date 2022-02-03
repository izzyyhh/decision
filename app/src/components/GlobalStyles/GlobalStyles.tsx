import React, { FunctionComponent } from "react";

import { DesktopContainer, MobileContainer } from "./GlobalStyles.sc";

const GlobalStyles: FunctionComponent = ({ children }) => {
    return (
        <>
            <MobileContainer>{children}</MobileContainer>
            <DesktopContainer>{children}</DesktopContainer>
        </>
    );
};

export default GlobalStyles;
