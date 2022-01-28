import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import React, { FunctionComponent } from "react";

import config from "../../config";

const CustomApolloProvider: FunctionComponent = ({ children }) => {
    console.log(config.REACT_APP_API_URL)
    const link = ApolloLink.from([
        onError(({ graphQLErrors }) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(() => {});
            }
        }),
        setContext((operation, { headers = {} }) => {
            return {
                headers: {
                    ...headers,
                },
            };
        }),
        createHttpLink({
            uri: `${config.REACT_APP_API_URL}/graphql`,
            credentials: "include",
        }),
    ]);

    const cache = new InMemoryCache({});

    const apolloClient = new ApolloClient({
        link,
        cache,
    });

    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default CustomApolloProvider;
