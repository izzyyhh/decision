import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useAuthToken, useRefreshToken } from "@hooks/useAuthToken";
import React, { FunctionComponent } from "react";
import { isExpired } from "react-jwt";

import config from "../../config";

const CustomApolloProvider: FunctionComponent = ({ children }) => {
    const [authToken, setAuthToken] = useAuthToken();
    const [refToken] = useRefreshToken();

    const link = ApolloLink.from([
        onError(({ graphQLErrors }) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(() => {});
            }
        }),
        setContext(async (operation, { headers = {} }) => {
            if (authToken && isExpired(authToken)) {
                const refreshTokenUrl = "https://securetoken.googleapis.com/v1/token?key=" + config.REACT_APP_FIREBASE_APIKEY;
                const params = new URLSearchParams({ grant_type: "refresh_token", refresh_token: refToken });
                const newAccessToken = await fetch(refreshTokenUrl, {
                    method: "POST",
                    body: params,
                })
                    .then((value) => {
                        return value.json();
                    })
                    .then(({ access_token }) => {
                        return access_token;
                    });
                setAuthToken(newAccessToken);
            }
            return {
                headers: {
                    ...headers,
                    Authorization: authToken ? `Bearer ${authToken}` : null,
                    Origin: "https://decision.projects.multimediatechnology.at",
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
