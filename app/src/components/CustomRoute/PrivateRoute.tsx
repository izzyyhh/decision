import { useAuthToken } from "@hooks/useAuthToken";
import React, { FunctionComponent } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: FunctionComponent = () => {
    // const res = useQuery<GQLQuery>(checkTokenQuery);
    const [authToken] = useAuthToken();

    // console.log(authToken, res.data)
    // console.log(res.data, "res")
    if (authToken /*&& res.data*/) {
        // const result = res.data.checkToken;
        return <Outlet />;
    } else {
        return <Navigate to="/auth" />;
    }
};

export default PrivateRoute;
