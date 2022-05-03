import { useMutation } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { GQLOption } from "@app/graphql.generated";
import LinkButton from "@components/LinkButton/LinkButton";
import { useUser } from "@context/user/useUser";
import React, { FunctionComponent, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import TinderCard from "react-tinder-card";

import { ADD_DECISION } from "../Binary/pollData.gql";
import { Card, DownVote, HelpText, Image, InfoBox, OnBoard, Title, TouchIcon, UpVote, VoteButtons, VoteWrapper } from "./Tinder.sc";

enum SwipeDirection {
    RIGHT = "right",
    LEFT = "left",
}

interface Props {
    optionsData: GQLOption[];
}

const Tinder: FunctionComponent<Props> = ({ optionsData }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const { pollId } = useParams();
    const { t } = useTranslation();
    const userId = user?.id;

    const [currentIndex, setCurrentIndex] = useState(optionsData.length - 1);
    const canSwipe = currentIndex >= 0;

    const currentIndexRef = useRef(currentIndex);

    const childRefs: any = useMemo(
        () =>
            Array(optionsData.length)
                .fill(0)
                .map((i) => React.createRef()),
        [],
    );

    const updateCurrentIndex = (val: any) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const swiped = (direction: SwipeDirection, id: any, index: any) => {
        updateCurrentIndex(index - 1);

        if (direction === SwipeDirection.RIGHT) {
            sendDecision(id, userId, pollId);
        }

        if (currentIndexRef.current < 0) {
            navigate(`/result/${pollId}`);
        }
    };

    const swipe = async (dir: SwipeDirection) => {
        if (canSwipe && currentIndex < optionsData.length) {
            await childRefs[currentIndexRef.current].current.swipe(dir); // Swipe the card!
        }
    };

    const outOfFrame = (name: any, idx: any) => {
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    };

    const [addDecision] = useMutation(ADD_DECISION);

    const sendDecision = async (option: string, user: any, poll: any) => {
        await addDecision({ variables: { data: { user, poll, option, answer: 0.6 } } });
    };

    console.log(optionsData);
    return (
        <ColumnFullWidth>
            <VoteWrapper>
                {optionsData.map((option, idx) => (
                    <TinderCard
                        className={`swipe ${currentIndex === idx - 1 ? "active" : ""}`}
                        ref={childRefs[idx]}
                        key={option.title}
                        onSwipe={(dir: SwipeDirection) => swiped(dir, option.id, idx)}
                        onCardLeftScreen={() => outOfFrame(option.title, idx)}
                    >
                        <Card first={idx + 1 === optionsData.length}>
                            <Image src={option.thumbnailUrl ?? "https://picsum.photos/200/300"} />
                            <Title first={idx + 1 === optionsData.length}>{option.title}</Title>
                            {idx + 1 === optionsData.length && (
                                <OnBoard>
                                    <InfoBox>
                                        <TouchIcon />
                                        <HelpText>{t("tinder.downVote")}</HelpText>
                                    </InfoBox>
                                    <InfoBox>
                                        <TouchIcon />
                                        <HelpText>{t("tinder.vote")}</HelpText>
                                    </InfoBox>
                                </OnBoard>
                            )}
                        </Card>
                    </TinderCard>
                ))}
                <VoteButtons>
                    <DownVote>
                        <LinkButton active={true} onClick={() => swipe(SwipeDirection.LEFT)}>
                            No
                        </LinkButton>
                    </DownVote>
                    <UpVote>
                        <LinkButton active={true} onClick={() => swipe(SwipeDirection.RIGHT)}>
                            Yes
                        </LinkButton>
                    </UpVote>
                </VoteButtons>
            </VoteWrapper>
        </ColumnFullWidth>
    );
};

export default Tinder;
