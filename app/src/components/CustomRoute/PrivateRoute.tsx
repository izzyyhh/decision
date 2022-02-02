import { useUser } from "@context/user/useUser";
import { useAuthToken } from "@hooks/useAuthToken";
import React, { FunctionComponent } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: FunctionComponent = () => {
    const { user } = useUser();
    console.log(user, "user-in-private");
    const [authToken] = useAuthToken();
    console.log(authToken, "authtoken");

    return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
