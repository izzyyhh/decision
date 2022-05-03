import { GQLUser } from "@app/graphql.generated";
import { useAuthToken, useRefreshToken } from "@hooks/useAuthToken";
import React, { FunctionComponent, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";

import { UserContext } from "./UserContext";

export const UserProvider: FunctionComponent = ({ children }) => {
    const [token] = useAuthToken();
    const [refreshToken] = useRefreshToken();

    const startUser =
        token == null && isExpired(token) ? null : { id: (decodeToken(token) as { user_id: string }).user_id, token: token, name: "", refreshToken };
    console.log(startUser);
    const [user, setUser] = useState<GQLUser | null>(startUser);
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
