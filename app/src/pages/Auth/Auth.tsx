import { useMutation } from "@apollo/client";
import { auth, signInWithCustomToken } from "@app/firebase/firebase";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import { useUser } from "@context/user/useUser";
import { useAuthToken } from "@hooks/useAuthToken";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import addUserMutation from "./addUserMutation.gql";
import { AuthWrapper, ButtonWrapper, HeadlineWrapper, UserName } from "./Auth.sc";

const Auth: FunctionComponent = () => {
    const [params] = useSearchParams();
    const redirect = params.get("redirect");

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [name, setName] = useState("Name");
    const [data] = useMutation(addUserMutation, { variables: { data: { name: name } } });
    const [, setAuthToken] = useAuthToken();
    const { setUser } = useUser();

    const sendUser = async () => {
        const result = await data();
        const { token } = result.data.addUser;

        signInWithCustomToken(auth, token)
            .then((userCredential: any) => {
                setAuthToken(token);
                setUser(result.data.addUser);
                navigate(redirect ? redirect : "/poll");
            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log({ errorCode, errorMessage }, "error");
            });
    };

    return (
        <AuthWrapper>
            <HeadlineWrapper>
                <Headline type="h2">{t("auth.headline")}</Headline>
            </HeadlineWrapper>
            <UserName name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <ButtonWrapper>
                <LinkButton onClick={sendUser} active={true} arrow={true} icon={undefined}>
                    Send
                </LinkButton>
            </ButtonWrapper>
        </AuthWrapper>
    );
};

export default Auth;
