import { useMutation, useQuery } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { GQLQuery } from "@app/graphql.generated";
import LinkButton from "@components/LinkButton/LinkButton";
import { useUser } from "@context/user/useUser";
import React, { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TinderCard from "react-tinder-card";

import { addDecision, getOptions } from "../Binary/pollData.gql";
import { Card, DownVote, Image, Title, UpVote, VoteButtons, VoteWrapper } from "./Tinder.sc";

enum SwipeDirection {
    RIGHT = "right",
    LEFT = "left",
}

const Tinder: FunctionComponent = () => {
    const [activeCard, setActiveCard] = useState<number>(0);
    const [active, setActive] = useState<string>("");
    const { user } = useUser();
    const navigate = useNavigate();
    const { pollId } = useParams();
    const userId = user?.id;

    console.log(userId);

    const options = useQuery<GQLQuery>(getOptions, { variables: { data: { pollId } } });
    const optionsData = options.data ? options.data.getOptionsForPoll : [];

    const [data] = useMutation(addDecision, { variables: { data: { user: userId, poll: pollId, option: active, answer: 0.6 } } });

    const sendDecision = async () => {
        const res = await data();
        if (!res.errors) {
            setActiveCard(activeCard + 1);
        }
    };

    const onSwipe = (direction: SwipeDirection, id: string) => {
        if (direction === SwipeDirection.RIGHT) {
            setActive(id);
            sendDecision();
        } else {
            setActiveCard(activeCard + 1);
        }

        if (activeCard + 1 === optionsData.length) {
            navigate(`/result/${pollId}`);
        }
    };

    return (
        <ColumnFullWidth>
            <VoteWrapper>
                {optionsData.map((option, idx) => (
                    <TinderCard key={option.id} onSwipe={(direction: SwipeDirection) => onSwipe(direction, option.id)}>
                        <Card active={activeCard === idx}>
                            <Image src={option.thumbnailUrl ?? "https://picsum.photos/200/300"} />
                            <Title>{option.title}</Title>
                        </Card>
                    </TinderCard>
                ))}
                <VoteButtons>
                    <DownVote>
                        <LinkButton active={true} onClick={() => onSwipe(SwipeDirection.LEFT, optionsData[activeCard].id)}>
                            No
                        </LinkButton>
                    </DownVote>
                    <UpVote>
                        <LinkButton active={true} onClick={() => onSwipe(SwipeDirection.RIGHT, optionsData[activeCard].id)}>
                            Yes
                        </LinkButton>
                    </UpVote>
                </VoteButtons>
            </VoteWrapper>
        </ColumnFullWidth>
    );
};

export default Tinder;
