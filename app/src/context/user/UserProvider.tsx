import { GQLUser } from "@app/graphql.generated";
import React, { FunctionComponent, useState } from "react";

import { UserContext } from "./UserContext";

export const UserProvider: FunctionComponent = ({ children }) => {
    const [user, setUser] = useState<GQLUser | null>(null);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
