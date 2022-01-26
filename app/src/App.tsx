import Home from "@pages/Home/Home";
import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import Webfontloader from "webfontloader";

import ApolloProvider from "./context/apollo/ApolloProvider";

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
                    <Home />
                </ApolloProvider>
            </>
        );
    }
}
export default App;
