import { GQLUser } from "@app/graphql.generated";
import { useAuthToken } from "@hooks/useAuthToken";
import React, { FunctionComponent, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";

import { UserContext } from "./UserContext";

export const UserProvider: FunctionComponent = ({ children }) => {
    const [token] = useAuthToken();
    console.log(token);

    const startUser = token == null && isExpired(token) ? null : { id: (decodeToken(token) as { uid: string }).uid, token: token, name: "" };

    console.log({ startUser });
    const [user, setUser] = useState<GQLUser | null>(startUser);
    console.log(user, "im state");
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
