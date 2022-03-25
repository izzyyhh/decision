import { useQuery } from "@apollo/client";
import LinkButton from "@components/LinkButton/LinkButton";
import { useUser } from "@context/user/useUser";
import { Card } from "@material-ui/core";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import React, { FunctionComponent } from "react";
import { format, register } from "timeago.js";

import getActivityQuery from "./getActivity.gql";
import { ActivitTitle, ActivityContainer, ActivityInformation, IconContainer, TimeAgoContainer, Wrapper } from "./RecentActivity.sc";

const deLocale = (number: number, index: number): [string, string] => {
    return [
        ["gerade eben", "vor einer Weile"],
        ["vor %s Sekunden", "in %s Sekunden"],
        ["vor 1 Minute", "in 1 Minute"],
        ["vor %s Minuten", "in %s Minuten"],
        ["vor 1 Stunde", "in 1 Stunde"],
        ["vor %s Stunden", "in %s Stunden"],
        ["vor 1 Tag", "in 1 Tag"],
        ["vor %s Tagen", "in %s Tagen"],
        ["vor 1 Woche", "in 1 Woche"],
        ["vor %s Wochen", "in %s Wochen"],
        ["vor 1 Monat", "in 1 Monat"],
        ["vor %s Monaten", "in %s Monaten"],
        ["vor 1 Jahr", "in 1 Jahr"],
        ["vor %s Jahren", "in %s Jahren"],
    ][index] as [string, string];
};

register("de", deLocale);

const RecentActivity: FunctionComponent = () => {
    const { user } = useUser();
    const { data } = useQuery(getActivityQuery, { variables: { data: { id: user?.id } } });
    const iconSwitch: any = {
        POLL: <PollOutlinedIcon fontSize="inherit"></PollOutlinedIcon>,
        DECISION: <HowToVoteOutlinedIcon fontSize="inherit"></HowToVoteOutlinedIcon>,
    };

    const locale = navigator.language == "en_US" || navigator.language == "en_UK" ? "en_US" : "de";

    if (user && data && data.getActivity.length != 0) {
        return (
            <Wrapper>
                {data.getActivity.slice(0, 5).map((activity: { name: string; date: number; type: string; id: string }, idx: number) => (
                    <LinkButton key={idx} primary={false} active={true} arrow={true} link={`/join/${activity.id}`}>
                        <ActivityContainer>
                            <IconContainer>{iconSwitch[activity.type]}</IconContainer>
                            <ActivityInformation>
                                <ActivitTitle>{activity.name}</ActivitTitle>
                                <TimeAgoContainer>{format(activity.date, locale)}</TimeAgoContainer>
                            </ActivityInformation>
                        </ActivityContainer>
                    </LinkButton>
                ))}
            </Wrapper>
        );
    } else {
        return (
            <Card>
                <LinkButton active={false} primary={false} arrow={false}>
                    You have no activity.
                </LinkButton>
            </Card>
        );
    }
};

export default RecentActivity;
