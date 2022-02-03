import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import Headline from "@components/Headline/Headline";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { OptionsForPollQuery, PollQuery } from "./Result.gql";

const Result: FunctionComponent = () => {
    const { t } = useTranslation();
    const pollId = "779f2e83-b811-4e32-bbfa-254c118cd21e";
    const options = useQuery<GQLQuery>(OptionsForPollQuery, { variables: { data: { pollId}}});
    const poll = useQuery<GQLQuery>(PollQuery, { variables: { data: { pollId }}});

    return (
        <>
            <Headline type="h2">{t("result.headline")}</Headline>
            {poll.data && (
                <h3>{poll.data.getPoll.title}</h3>
            )}
            {options.data && (
                <ul>
                    {options.data.getOptionsForPoll.map((option) => (
                        <li key={option.id}>
                            {option.title}
                        </li>
                    ))}
                </ul>
            )}
            <h3>R</h3>
        </>
    );
};

export default Result;