import { useMutation } from "@apollo/client";
import { auth, signInWithCustomToken } from "@app/firebase/firebase";
import { useUser } from "@context/user/useUser";
import { useAuthToken } from "@hooks/useAuthToken";
import React, { FunctionComponent, ReactNode, useEffect } from "react";

import addUserMutation from "./addUserMutation.gql";

interface Props {
    children: ReactNode;
}

const Auth: FunctionComponent<Props> = ({ children }) => {
    const [data] = useMutation(addUserMutation, { variables: { data: { name: "" } } });
    const [cookie, setAuthToken] = useAuthToken();
    const { user, setUser } = useUser();

    useEffect(() => {
        const addUser = async () => {
            const result = await data();
            const { token } = result.data.addUser;

            signInWithCustomToken(auth, token)
                .then((userCredential: any) => {
                    setAuthToken(token);
                    setUser(result.data.addUser);
                })
                .catch((error: any) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log({ errorCode, errorMessage }, "error");
                });
        };

        if (!user && !cookie) {
            addUser();
        }
    }, []);
    return <>{children}</>;
};

export default Auth;
