import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { GQLQuery } from "@app/graphql.generated";
import LinkButton from "@components/LinkButton/LinkButton";
import { useUser } from "@context/user/useUser";
import React, { FunctionComponent, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TinderCard from "react-tinder-card";

import { ADD_DECISION, getOptions } from "../Binary/pollData.gql";
import { DecisionsPollQuery } from "./Tinder.gql";
import { Card, DownVote, Image, Title, UpVote, VoteButtons, VoteWrapper } from "./Tinder.sc";

enum SwipeDirection {
    RIGHT = "right",
    LEFT = "left",
}
interface IOptions {
    [id: string]: number;
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

const Tinder: FunctionComponent = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const { pollId } = useParams();
    const userId = user?.id;

    const [matches, setMatches] = useState<number>(0);
    const userOptions: IOptions = {};
    const uniqueUsers: Array<string> = [];
    const [data] = useLazyQuery(DecisionsPollQuery, { variables: { data: { pollId } } });

    const options = useQuery<GQLQuery>(getOptions, { variables: { data: { pollId } } });
    const optionsData = options.data ? options.data.getOptionsForPoll : [];

    const [currentIndex, setCurrentIndex] = useState(optionsData.length - 1);

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

    const addUser = (userId: string) => {
        if (!uniqueUsers.includes(userId)) {
            uniqueUsers.push(userId);
        }
    };

    const initilizeOptions = (optionId: string) => {
        userOptions[optionId] = 0;
    };

    const addOption = (optionId: string) => {
        console.log(optionId);
        userOptions[optionId] = userOptions[optionId] + 1;
    };

    const getMatches = async () => {
        const results = await data();
        const decisions = results.data?.getDecisionsForPoll;
        decisions.forEach((element: IDecision) => {
            addUser(element.user.id);
            initilizeOptions(element.option.title);
        });
        decisions.forEach((element: IDecision) => {
            addOption(element.option.title);
        });

        if (uniqueUsers.length > 1) {
            let totalMatches = 0;
            for (const key in userOptions) {
                if (userOptions[key] == uniqueUsers.length) {
                    totalMatches += 1;
                }
            }
            setMatches(totalMatches);
        }
    };

    const canSwipe = currentIndex >= 0;

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
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    };

    const [addDecision] = useMutation(ADD_DECISION);

    const sendDecision = async (option: string, user: any, poll: any) => {
        await addDecision({ variables: { data: { user, poll, option, answer: 0.6 } } });
        getMatches();
    };

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
                        <Card active={true}>
                            <Image src={option.thumbnailUrl ?? "https://picsum.photos/200/300"} />
                            <Title>{option.title}</Title>
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
            {matches > 0 && (
                <LinkButton
                    onClick={() => {
                        navigate(`/result/${pollId}`);
                    }}
                    arrow={true}
                    active={true}
                >
                    Du hast {matches} Matches!
                </LinkButton>
            )}
        </ColumnFullWidth>
    );
};

export default Tinder;
