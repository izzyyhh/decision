import { useMutation } from "@apollo/client";
import { useUser } from "@context/user/useUser";
import { useAuthToken, useRefreshToken } from "@hooks/useAuthToken";
import React, { FunctionComponent, ReactNode, useEffect } from "react";

import addUserMutation from "./addUserMutation.gql";

interface Props {
    children: ReactNode;
}

const Auth: FunctionComponent<Props> = ({ children }) => {
    const [data] = useMutation(addUserMutation, { variables: { data: { name: "" } } });
    const [cookie, setAuthToken] = useAuthToken();
    const [, setRefreshToken] = useRefreshToken();
    const { user, setUser } = useUser();

    useEffect(() => {
        const addUser = async () => {
            const result = await data();
            const { token, refreshToken } = result.data.addUser;

            setAuthToken(token);
            setRefreshToken(refreshToken);
            setUser(result.data.addUser);
        };

        if (!user && !cookie) {
            addUser();
        }
    }, []);
    return <>{children}</>;
};

export default Auth;
