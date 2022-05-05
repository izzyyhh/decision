import { useLazyQuery, useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import { AppRoutes } from "@app/Router";
import Seo from "@app/seo/Seo";
import Auth from "@components/Auth/Auth";
import Card from "@components/Card/Card";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { DecisionsPollQuery, OptionsForPollQuery, PollQuery } from "./Result.gql";
import {
    ButtonContainer,
    ColumnFullWidth,
    Image,
    OptionContainer,
    OptionPercentage,
    OptionTitle,
    StatBar,
    StatBarFiller,
    TinderResultText,
    TinderResultTextBackdrop,
    TinderResultTextWrapper,
} from "./Result.sc";

export enum Type {
    BINARY = "BINARY",
    TINDER = "TINDER",
    DATE = "DATE",
}

interface IOptions {
    [id: string]: {
        number: number;
        isMatch: boolean;
    };
}
interface IDecision {
    user: {
        id: string;
        name: string;
    };
    option: {
        id: string;
        title: string;
    };
}

// refactor me
const Result: FunctionComponent = () => {
    const { t } = useTranslation();
    const { pollId } = useParams();
    const options = useQuery<GQLQuery>(OptionsForPollQuery, { variables: { data: { pollId } } });
    const poll = useQuery<GQLQuery>(PollQuery, { variables: { data: { pollId } } });
    const decisions = useQuery<GQLQuery>(DecisionsPollQuery, { variables: { data: { pollId } } });
    const [matches, setMatches] = useState<number>(0);
    const userOptions: IOptions = {};
    const uniqueUsers: Array<string> = [];
    const [getTinderResults, { data: tinderResults }] = useLazyQuery(DecisionsPollQuery, { variables: { data: { pollId } }, pollInterval: 500 });
    const [userOptionsAll, setUserOptionsAll] = useState<IOptions>(userOptions);

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

    const addUser = (userId: string) => {
        if (!uniqueUsers.includes(userId)) {
            uniqueUsers.push(userId);
        }
    };

    const initilizeOptions = (optionId: string) => {
        userOptions[optionId] = {
            number: 0,
            isMatch: false,
        };
    };

    const addOption = (optionId: string) => {
        userOptions[optionId].number = userOptions[optionId].number + 1;
    };

    useEffect(() => {
        getTinderResults();
    }, []);

    useEffect(() => {
        if (tinderResults !== undefined) {
            const results = tinderResults;
            const decisions = results.getDecisionsForPoll;
            decisions.forEach((element: IDecision) => {
                addUser(element.user.id);
                initilizeOptions(element.option.title);
            });
            console.log(userOptions);
            decisions.forEach((element: IDecision) => {
                addOption(element.option.title);
            });

            if (uniqueUsers.length > 1) {
                let totalMatches = 0;
                for (const key in userOptions) {
                    if (userOptions[key].number == uniqueUsers.length) {
                        totalMatches += 1;
                        userOptions[key].isMatch = true;
                    }
                }
                setMatches(totalMatches);
            }
            setUserOptionsAll(userOptions);
            console.log(userOptionsAll);
        }
    }, [tinderResults]);

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
            <Seo title={poll.data?.getPoll.title} />
            <Auth>
                <ColumnFullWidth>
                    <Headline type="h2">{poll.data?.getPoll.title}</Headline>
                    <>
                        {poll.data && poll.data?.getPoll.type === Type.TINDER && (
                            <Card title={`Result: ${matches} Matches`}>
                                {options.data && (
                                    <>
                                        {options.data.getOptionsForPoll.map((option) => {
                                            console.log(userOptionsAll[option.title]);
                                            const test = userOptionsAll[option.title];

                                            if (test && test.isMatch) {
                                                return (
                                                    <>
                                                        <Image
                                                            src={
                                                                option.thumbnailUrl && option.thumbnailUrl.length > 0
                                                                    ? option.thumbnailUrl
                                                                    : "https://picsum.photos/200/300"
                                                            }
                                                        />
                                                        <TinderResultTextWrapper>
                                                            <TinderResultTextBackdrop>
                                                                <TinderResultText>{option.title}</TinderResultText>
                                                            </TinderResultTextBackdrop>
                                                        </TinderResultTextWrapper>
                                                    </>
                                                );
                                            }
                                        })}
                                    </>
                                )}
                            </Card>
                        )}
                        {poll.data && poll.data?.getPoll.type !== Type.TINDER && (
                            <>
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
                            </>
                        )}
                        ;
                    </>
                </ColumnFullWidth>
            </Auth>
        </>
    );
};

export default Result;
