import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import Headline from "@components/Headline/Headline";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { DecisionsPollQuery, OptionsForPollQuery, PollQuery } from "./Result.gql";

const Result: FunctionComponent = () => {
    const { t } = useTranslation();
    const pollId = "c29b3cc7-3ada-40bb-b325-3e88c3b44fc8";
    const options = useQuery<GQLQuery>(OptionsForPollQuery, { variables: { data: { pollId } } });
    const poll = useQuery<GQLQuery>(PollQuery, { variables: { data: { pollId } } });
    const decisions = useQuery<GQLQuery>(DecisionsPollQuery, { variables: { data: { pollId } } });

    const decisionsArr = decisions.data ? decisions.data?.getDecisionsForPoll : [];
    const c = decisionsArr.reduce((agg: any, curr: any) => {
        agg[curr.option.title] = agg[curr.option.title] ? agg[curr.option.title] + 1 : 1;
        return agg;
    }, {});

    let max = -1;
    let maxTitle = "";

    Object.keys(c).forEach((k) => {
        if (max < c[k]) {
            max = c[k];
            maxTitle = k;
        }
    });

    return (
        <>
            <Headline type="h2">{t("result.headline")}</Headline>
            {poll.data && <h3>{poll.data.getPoll.title}</h3>}
            {options.data && (
                <ul>
                    {options.data.getOptionsForPoll.map((option) => (
                        <li key={option.id}>{option.title}</li>
                    ))}
                </ul>
            )}
            {max > -1 && (
                <>
                    <h2>Proposal</h2>
                    <h1>{maxTitle}</h1>
                </>
            )}
        </>
    );
};

export default Result;
