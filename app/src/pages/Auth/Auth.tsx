import { useMutation } from "@apollo/client";
import { auth, signInWithCustomToken } from "@app/firebase/firebase";
import Headline from "@components/Headline/Headline";
import { useUser } from "@context/user/useUser";
import { useAuthToken } from "@hooks/useAuthToken";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";

import addUserMutation from "./addUserMutation.gql";
import { AuthWrapper, ButtonWrapper, HeadlineWrapper, UserName } from "./Auth.sc";

const Auth: FunctionComponent = () => {
    const { t } = useTranslation();
    const [name, setName] = useState("Name");
    const [data] = useMutation(addUserMutation, { variables: { data: { name: name } } });
    const [, setAuthToken] = useAuthToken();
    const { user, setUser } = useUser();
    console.log(user, "user");

    const sendUser = async () => {
        const result = await data();
        const { token } = result.data.addUser;

        console.log(token, "token")
        signInWithCustomToken(auth, token).then((userCredential: any) => {
    //     //     // Signed in
            const user = userCredential.user;
            console.log(user.uid, "credential2")
            setAuthToken(token)
          })
          .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({errorCode, errorMessage}, "error")
          });
    }
    
    return (
        <AuthWrapper>
            <HeadlineWrapper>
                <Headline type="h2">{t("auth.headline")}</Headline>
            </HeadlineWrapper>
            <UserName name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <ButtonWrapper>
                <button onClick={sendUser}>SEnd</button>
            </ButtonWrapper>
        </AuthWrapper>
    );
};

export default Auth;
