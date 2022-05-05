import { useQuery } from "@apollo/client";
import { GQLPollType, GQLQuery } from "@app/graphql.generated";
import { getOptions } from "@components/Polls/Binary/pollData.gql";
import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

import Binary from "./Binary/Binary";
import Tinder from "./Tinder/Tinder";

interface Props {
    poll: GQLPollType | undefined;
}

const Poll: any = {
    BINARY: Binary,
    TINDER: Tinder,
    DATE: Binary,
};

const Polls: FunctionComponent<Props> = ({ poll }) => {
    const { pollId } = useParams();

    const { loading, data } = useQuery<GQLQuery>(getOptions, { variables: { data: { pollId } } });

    if (loading) {
        return <></>;
    } else {
        if (poll) {
            if (typeof Poll[poll] !== undefined) {
                const optionsData = data?.getOptionsForPoll ? data.getOptionsForPoll : [];
                const Component = Poll[poll];

                return <Component optionsData={optionsData} />;
            }
        }
    }

    return <></>;
};

export default Polls;
