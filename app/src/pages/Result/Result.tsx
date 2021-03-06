import { useLazyQuery, useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import Seo from "@app/seo/Seo";
import Auth from "@components/Auth/Auth";
import Card from "@components/Card/Card";
import Headline from "@components/Headline/Headline";
import Share from "@components/Share/Share";
import { HeadingWrapper } from "@pages/DecisionPage/DecisionPage.sc";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router";

import IOptions from "../../types/IOptions";
import { getMatches } from "../../utils/getMatches";
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

// refactor me
const Result: FunctionComponent = () => {
    const { pollId } = useParams();
    const options = useQuery<GQLQuery>(OptionsForPollQuery, { variables: { data: { pollId } } });
    const poll = useQuery<GQLQuery>(PollQuery, { variables: { data: { pollId } } });
    const decisions = useQuery<GQLQuery>(DecisionsPollQuery, { variables: { data: { pollId } } });
    const [matches, setMatches] = useState<number>(0);
    const userOptions: IOptions = {};
    const [getTinderResults, { data: tinderResults }] = useLazyQuery(DecisionsPollQuery, { variables: { data: { pollId } }, pollInterval: 500 });
    const [userOptionsAll, setUserOptionsAll] = useState<IOptions>(userOptions);
    const shareLink = `${window.location.origin}/decision/${pollId}`;

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

    const convertDate = (type: any, date: string) => {
        if (type === Type.DATE) {
            const dt = new Date(date);
            const title = dt.toLocaleDateString() + " " + dt.getHours() + ":" + dt.getMinutes();
            return title;
        }
        return date;
    };

    useEffect(() => {
        getTinderResults();
    }, []);

    useEffect(() => {
        if (tinderResults !== undefined) {
            const results = tinderResults;
            const decisions = results.getDecisionsForPoll;

            const { totalMatches, userOptions } = getMatches(decisions);
            setMatches(totalMatches);
            setUserOptionsAll(userOptions);
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
                    <HeadingWrapper>
                        <Headline type="h2">{poll.data?.getPoll.title}</Headline>
                        <Share url={shareLink}></Share>
                    </HeadingWrapper>
                    <>
                        {poll.data && poll.data?.getPoll.type === Type.TINDER && (
                            <Card title={`Result: ${matches} Matches`}>
                                {options.data && (
                                    <>
                                        {options.data.getOptionsForPoll.map((option) => {
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
                                                        <OptionTitle>{convertDate(poll.data?.getPoll.type, option.title)}</OptionTitle>
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
                                    {/* <LinkButton active={true} link={`/decision/${pollId}`}>
                                        {t("result.vote")}
                                    </LinkButton>
                                    <LinkButton active={true} link={AppRoutes.Poll}>
                                        {t("result.share")}
                                    </LinkButton> */}
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
