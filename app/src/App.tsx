import GlobalStyles from "@components/GlobalStyles/GlobalStyles";
import ThemeProvider from "@components/ThemeProvider/ThemeProvider";
import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import Webfontloader from "webfontloader";

import ApolloProvider from "./context/apollo/ApolloProvider";
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
                    <ThemeProvider>
                        <GlobalStyles>
                            <Router></Router>
                        </GlobalStyles>
                    </ThemeProvider>
                </ApolloProvider>
            </>
        );
    }
}
export default App;
