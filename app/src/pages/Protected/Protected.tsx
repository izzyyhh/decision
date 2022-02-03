import { useUser } from "@context/user/useUser";
import React, { FunctionComponent } from "react";

const Protected: FunctionComponent = () => {
    const { user } = useUser();

    console.log(user, "pro-uiser");
    return (
        <>
            <h1>You can only see this page if you are logged In</h1>
            <button>Logout</button>
        </>
    );
};

export default Protected;
