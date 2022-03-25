import { useLazyQuery, useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import { AppRoutes } from "@app/Router";
import Auth from "@components/Auth/Auth";
import Card from "@components/Card/Card";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { DecisionsPollQuery, OptionsForPollQuery, PollQuery } from "./Result.gql";
import { ButtonContainer, ColumnFullWidth, OptionContainer, OptionPercentage, OptionTitle, StatBar, StatBarFiller } from "./Result.sc";

// refactor me
const Result: FunctionComponent = () => {
    const { t } = useTranslation();
    const { pollId } = useParams();
    const options = useQuery<GQLQuery>(OptionsForPollQuery, { variables: { data: { pollId } } });
    const poll = useQuery<GQLQuery>(PollQuery, { variables: { data: { pollId } } });
    const decisions = useQuery<GQLQuery>(DecisionsPollQuery, { variables: { data: { pollId } } });

    const decisionsArr = decisions.data ? decisions.data?.getDecisionsForPoll : [];
    const resultData = decisionsArr.reduce((agg: any, curr: any) => {
        agg[curr.option.title] = agg[curr.option.title] ? agg[curr.option.title] + 1 : 1;
        return agg;
    }, {});

    const [getDecisions, { data }] = useLazyQuery(DecisionsPollQuery, { variables: { data: { pollId } }, pollInterval: 500 });

    const [resultObject, setResultObject] = useState(resultData);

    let max = -1;

    const [decisionAmount, setAmount] = useState(0);

    Object.keys(resultData).forEach((key) => {
        if (max < resultData[key]) {
            max = resultData[key];
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
        <Auth>
            <ColumnFullWidth>
                <Headline type="h2">{poll.data?.getPoll.title}</Headline>
                <Card title="Result">
                    {options.data && (
                        <>
                            {options.data.getOptionsForPoll.map((option) => {
                                const percentage = isNaN((resultObject[option.title] * 100) / decisionAmount)
                                    ? 0
                                    : (resultObject[option.title] * 100) / decisionAmount;

                                return (
                                    <OptionContainer key={option.id}>
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
                </Card>
                <ButtonContainer>
                    <LinkButton active={true} link={AppRoutes.Poll}>
                        {t("result.vote")}
                    </LinkButton>
                    <LinkButton active={true} link={AppRoutes.Poll}>
                        {t("result.share")}
                    </LinkButton>
                </ButtonContainer>
            </ColumnFullWidth>
        </Auth>
    );
};

export default Result;
