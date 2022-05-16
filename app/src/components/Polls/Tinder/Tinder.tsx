import { useLazyQuery, useMutation } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { GQLOption } from "@app/graphql.generated";
import LinkButton from "@components/LinkButton/LinkButton";
import { useSnack } from "@context/snackbar/useSnack";
import { useUser } from "@context/user/useUser";
import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { getMatches } from "../../../utils/getMatches";
import { ADD_DECISION } from "../Binary/pollData.gql";
import { CanDecideQuery, DecisionsPollQuery } from "./Tinder.gql";
import {
    Card,
    DownVote,
    HelpText,
    IconClose,
    IconHeart,
    Image,
    InfoBox,
    OnBoard,
    TinderCard,
    Title,
    TouchIcon,
    UpVote,
    VoteButtons,
    VoteWrapper,
} from "./Tinder.sc";

enum SwipeDirection {
    RIGHT = "right",
    LEFT = "left",
}

type Snack = {
    message: string;
    open: boolean;
    severity?: "info" | "success" | "warning" | "error";
};

interface Props {
    optionsData: GQLOption[];
}

const getOnBoard = () => {
    const [cookies, setCookie] = useCookies(["tinder_onBoard"]);

    if (!cookies["tinder_onBoard"]) {
        setCookie("tinder_onBoard", true);
        return true;
    }

    return false;
};

const Tinder: FunctionComponent<Props> = ({ optionsData }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const { pollId } = useParams();
    const { t } = useTranslation();
    const userId = user?.id;
    const [onBoard] = useState<boolean>(getOnBoard());

    const [matches, setMatches] = useState<number>(0);
    const [, { refetch }] = useLazyQuery(DecisionsPollQuery, { variables: { data: { pollId } } });
    const { setSnack } = useSnack();
    const [, { refetch: refetchMadeDecision }] = useLazyQuery(CanDecideQuery, { variables: { data: { user: userId, poll: pollId } } });

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

    const showMatches = async () => {
        const results = await refetch();
        const decisions = results.data?.getDecisionsForPoll;
        const {totalMatches} = getMatches(decisions);
        setMatches(totalMatches);
    };

    const canDecide = async (setSnack: (snack: Snack) => void) => {
        const response = await refetchMadeDecision();
        if (!response?.data.canDecide) {
            setSnack({ message: "already.made.decision.error", open: true, severity: "error" });
            navigate(`/result/${pollId}`);
        }
    };

    useEffect(() => {
        canDecide(setSnack);
    }, []);

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
        showMatches();
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
                        <Card first={idx + 1 === optionsData.length && onBoard}>
                            <Image
                                src={option.thumbnailUrl && option.thumbnailUrl.length > 0 ? option.thumbnailUrl : "https://picsum.photos/200/300"}
                            />
                            <Title first={idx + 1 === optionsData.length && onBoard}>
                                {option.title} {idx}
                            </Title>
                            {idx + 1 === optionsData.length && onBoard && (
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
                <VoteButtons first={onBoard}>
                    <DownVote onClick={() => swipe(SwipeDirection.LEFT)}>
                        <IconClose />
                    </DownVote>
                    <UpVote onClick={() => swipe(SwipeDirection.RIGHT)}>
                        <IconHeart />
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
