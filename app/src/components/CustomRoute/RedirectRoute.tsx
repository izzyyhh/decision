import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import { useAuthToken } from "@hooks/useAuthToken";
import { buildUrl, useSearchParams } from "@utils/urlHelpers";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";

import checkTokenQuery from "./checkToken.gql";

const RedirectRoute: FunctionComponent = () => {
    const res = useQuery<GQLQuery>(checkTokenQuery);
    const navigate = useNavigate();
    const [authToken] = useAuthToken();
    const [params] = useSearchParams();

    const joinUrl = buildUrl( "/join", { q: params.get("q") });
    const authUrl = buildUrl( "/auth", { redirect: joinUrl });

    if (authToken && res.data) {
        const result = res.data.checkToken;
        if( result ){
            return <Outlet />
        } else {
            navigate(authUrl)
        }
    }
    if(res.error){
        navigate(authUrl)
    }

    return <></>;
};

export default RedirectRoute;
