import ThemeProvider from "@components/ThemeProvider/ThemeProvider";
import { SnackbarProvider } from "@context/snackbar/SnackbarProvider";
import { UserProvider } from "@context/user/UserProvider";
import React, { Component, Suspense } from "react";
import CookieBot from "react-cookiebot";
import * as ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import Webfontloader from "webfontloader";

import GlobalStyle, { Container } from "./common/GlobalStyles";
import config from "./config";
import ApolloProvider from "./context/apollo/ApolloProvider";
import i18n from "./i18n";
import Router from "./Router";

class App extends Component {
    public static render(baseEl: Element) {
        Webfontloader.load({
            google: {
                families: ["Roboto:100,400,500,700", "Asap:400,500,700", "Work Sans:500", "Open Sans:300,400,500,600,700"],
            },
        });
        ReactDOM.render(<App />, baseEl);
    }

    public render() {
        return (
            <>
                <ApolloProvider>
                    <SnackbarProvider>
                        <UserProvider>
                            <ThemeProvider>
                                <I18nextProvider i18n={i18n}>
                                    <GlobalStyle />
                                    <Suspense fallback="loading">
                                        <Container>
                                            <CookieBot domainGroupId={config.REACT_APP_COOKIEBOT} />
                                            <Router />
                                        </Container>
                                    </Suspense>
                                </I18nextProvider>
                            </ThemeProvider>
                        </UserProvider>
                    </SnackbarProvider>
                </ApolloProvider>
            </>
        );
    }
}
export default App;
