import { useMutation } from "@apollo/client";
import { auth, signInWithCustomToken } from "@app/firebase/firebase";
import { useAuthToken } from "@hooks/useAuthToken";
import React, { FunctionComponent, useState } from "react";

import addUserMutation from './addUserMutation.gql'
const Auth: FunctionComponent = () => {
    const [name, setName] = useState("name");
    const [data] = useMutation(addUserMutation,{variables: {data: {name: name}}})
    const [, setAuthToken,] = useAuthToken()
    console.log(auth.currentUser, "currentUser")
    const sendUser =  async() => {
        const result = await data()
        const {token} = result.data.addUser

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
        <>
            <h1>Hello my man</h1>
            <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            <br />
            {name}
            <button onClick={sendUser}>SEnd</button>
        </>
    );
};

export default Auth;
