import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import { useAuthToken } from "@hooks/useAuthToken";
import React, { FunctionComponent } from "react";
import { Navigate, Outlet } from "react-router-dom";

import checkTokenQuery from "./checkToken.gql";

const PrivateRoute: FunctionComponent = () => {
    const res = useQuery<GQLQuery>(checkTokenQuery);
    const [authToken] = useAuthToken();

    if (authToken && res.data) {
        const result = res.data.checkToken;
        return result ? <Outlet /> : <Navigate to="/auth" />;
    }

    return <></>;
};

export default PrivateRoute;
