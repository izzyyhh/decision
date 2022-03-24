import { GQLPollType } from "@app/graphql.generated";
import React, { FunctionComponent } from "react";

import Binary from "./Binary/Binary";
import Tinder from "./Tinder/Tinder";

interface Props {
    poll: GQLPollType | undefined;
}

const Poll: any = {
    BINARY: Binary,
    TINDER: Tinder,
};

const Polls: FunctionComponent<Props> = ({ poll }) => {
    if (poll) {
        if (typeof Poll[poll] !== undefined) {
            const Component = Poll[poll];

            return <Component />;
        }
    }

    return <></>;
};

export default Polls;
