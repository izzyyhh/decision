import { GQLUser } from "@app/graphql.generated";
import { createContext } from "react";

interface IUserContext {
    user: GQLUser | null;
    setUser: (user: GQLUser) => void;
}

export const UserContext = createContext<IUserContext>({ user: null, setUser: (user: GQLUser) => {} });
