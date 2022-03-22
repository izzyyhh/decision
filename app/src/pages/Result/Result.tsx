import { useLazyQuery, useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import { AppRoutes } from "@app/Router";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { DecisionsPollQuery, OptionsForPollQuery, PollQuery } from "./Result.gql";
import {
    Box,
    BoxHeader,
    ColumnFullWidth,
    OptionContainer,
    StatBar,
    OptionTitle,
    StatBarFiller,
    OptionPercentage,
    ButtonContainer,
} from "./Result.sc";

// refactor me
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

    const [getDecisions, { data }] = useLazyQuery(DecisionsPollQuery, { variables: { data: { pollId } }, pollInterval: 500 });

    const [resultObject, setResultObject] = useState(c);

    let max = -1;
    let maxTitle = "";

    let [decisionAmount, setAmount] = useState(0);

    Object.keys(c).forEach((k) => {
        if (max < c[k]) {
            max = c[k];
            maxTitle = k;
        }
    });

    useEffect(() => {
        getDecisions();
    }, []);

    useEffect(() => {
        if (data) {
            setAmount(data.getDecisionsForPoll.length);
            const results = data.getDecisionsForPoll.reduce((agg: any, curr: any) => {
                agg[curr.option.title] = agg[curr.option.title] ? agg[curr.option.title] + 1 : 1;
                return agg;
            }, {});
            setResultObject(results);
        }
    }, [data]);

    return (
        <>
            <ColumnFullWidth>
                <Headline type="h2">{poll.data?.getPoll.title}</Headline>
                <Box>
                    <BoxHeader>Results</BoxHeader>
                    {options.data && (
                        <>
                            {options.data.getOptionsForPoll.map((option) => {
                                const percentage = isNaN((resultObject[option.title] * 100) / decisionAmount)
                                    ? 0
                                    : (resultObject[option.title] * 100) / decisionAmount;

                                return (
                                    <OptionContainer>
                                        <OptionTitle>{option.title}</OptionTitle>
                                        <StatBar>
                                            <StatBarFiller id={option.title} style={{ width: `${percentage}%` }}>
                                                <OptionPercentage>{Math.round(percentage)}%</OptionPercentage>
                                            </StatBarFiller>
                                        </StatBar>
                                    </OptionContainer>
                                );
                            })}
                        </>
                    )}
                </Box>
                <ButtonContainer>
                    <LinkButton active={true} link={AppRoutes.Poll}>
                        {t("result.vote")}
                    </LinkButton>
                    <LinkButton active={true} link={AppRoutes.Poll}>
                        {t("result.share")}
                    </LinkButton>
                </ButtonContainer>
            </ColumnFullWidth>
        </>
    );
};

export default Result;
