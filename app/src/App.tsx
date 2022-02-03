import GlobalStyles from "@components/GlobalStyles/GlobalStyles";
import ThemeProvider from "@components/ThemeProvider/ThemeProvider";
import { UserProvider } from "@context/user/UserProvider";
import React, { Component, Suspense } from "react";
import * as ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import Webfontloader from "webfontloader";

import ApolloProvider from "./context/apollo/ApolloProvider";
import i18n from "./i18n";
import Router from "./Router";

class App extends Component {
    public static render(baseEl: Element) {
        Webfontloader.load({
            google: {
                families: ["Roboto:400,500,700", "Asap:400,500,700", "Work Sans:500"],
            },
        });
        ReactDOM.render(<App />, baseEl);
    }

    public render() {
        return (
            <>
                <ApolloProvider>
                    <UserProvider>
                        <ThemeProvider>
                            <I18nextProvider i18n={i18n}>
                                <GlobalStyles>
                                    <Suspense fallback="loading">
                                        <Router />
                                    </Suspense>
                                </GlobalStyles>
                            </I18nextProvider>
                        </ThemeProvider>
                    </UserProvider>
                </ApolloProvider>
            </>
        );
    }
}
export default App;
