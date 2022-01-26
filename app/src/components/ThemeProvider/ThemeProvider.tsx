import { ThemeProvider as MaterialUIThemeProvider } from "@material-ui/core";
import themeLight from "@theme/themeLight";
import React, { FunctionComponent, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }) => {
    const themeUse = themeLight;
    return (
        <MaterialUIThemeProvider theme={themeUse}>
            <StyledThemeProvider theme={themeUse}>{children}</StyledThemeProvider>
        </MaterialUIThemeProvider>
    );
};

export default ThemeProvider;
