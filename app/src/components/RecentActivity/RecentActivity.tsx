import { useLazyQuery } from "@apollo/client";
import LinkButton from "@components/LinkButton/LinkButton";
import { useUser } from "@context/user/useUser";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
    ][index] as [string, string];};

register("de", deLocale);

interface ActivityProps {
    limit: number;
}

const RecentActivity: FunctionComponent<ActivityProps> = ({limit = 5}) => {
    const { user } = useUser();
    const  [getRecentActivity, { data}] = useLazyQuery(getActivityQuery, { variables: { data: { id: user?.id }, pollInterval: 1000  } });
    const { t } = useTranslation();

    useEffect(() => {
        getRecentActivity();
    }, []);

    const iconSwitch: any = {
        POLL: <PollOutlinedIcon fontSize="inherit"></PollOutlinedIcon>,
        DECISION: <HowToVoteOutlinedIcon fontSize="inherit"></HowToVoteOutlinedIcon>,
    };

    const locale = navigator.language == "en_US" || navigator.language == "en_UK" ? "en_US" : "de";

    if (user && data && data.getActivity.length != 0) {
        return (
            <Wrapper>
                {data.getActivity.slice(0, limit).map((activity: { name: string; date: number; type: string; id: string, pollId:string }, idx: number) => (
                    <LinkButton key={idx} primary={false} active={true} arrow={true} link={`/result/${activity.id == activity.pollId ? activity.id : activity.pollId}`}>
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
            <Wrapper>
                <LinkButton active={false} primary={false} arrow={false}>
                    {t("welcome.recentActivity.noActivity")}
                </LinkButton>
            </Wrapper>
        );
    }
};

export default RecentActivity;
