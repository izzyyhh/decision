import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import Headline from "@components/Headline/Headline";
import { PageContainer } from "@theme/common.sc";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { DecisionsPollQuery, OptionsForPollQuery, PollQuery } from "./Result.gql";
import { OptionItem, OptionList, Proposal, Title, VoteContainer, Winner } from "./Result.sc";

const Result: FunctionComponent = () => {
    const { t } = useTranslation();
    const { pollId } = useParams();
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
        <PageContainer>
            <Headline type="h2">{t("result.headline")}</Headline>
            {poll.data && <Title>{poll.data.getPoll.title}</Title>}
            {options.data && (
                <OptionList>
                    {options.data.getOptionsForPoll.map((option) => (
                        <OptionItem key={option.id}>
                            <div>{`${option.title} (${c[option.title] ? c[option.title] : 0})`}</div>
                        </OptionItem>
                    ))}
                </OptionList>
            )}
            {max > -1 && (
                <VoteContainer>
                    <Proposal>
                        <h3>{t("result.proposal")}</h3>
                    </Proposal>
                    <Winner>
                        <h3>{maxTitle}</h3>
                    </Winner>
                </VoteContainer>
            )}
        </PageContainer>
    );
};

export default Result;
