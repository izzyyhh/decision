import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import { useAuthToken } from "@hooks/useAuthToken";
import { buildUrl } from "@utils/urlHelpers";
import React, { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router";
import { Outlet } from "react-router-dom";

import checkTokenQuery from "./checkToken.gql";

const RedirectRoute: FunctionComponent = () => {
    const res = useQuery<GQLQuery>(checkTokenQuery);
    const navigate = useNavigate();
    const [authToken] = useAuthToken();
    const { pollId } = useParams();
    const joinUrl = `/join/${pollId}`;
    const authUrl = buildUrl("/auth", { redirect: joinUrl });

    if (authToken && res.data) {
        const result = res.data.checkToken;
        if (result) {
            return <Outlet />;
        } else {
            navigate(authUrl);
        }
    }
    if (res.error) {
        navigate(authUrl);
    }

    return <></>;
};

export default RedirectRoute;
