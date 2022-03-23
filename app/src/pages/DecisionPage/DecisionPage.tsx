import { useMutation, useQuery } from "@apollo/client";
import { GQLOption, GQLQuery } from "@app/graphql.generated";
import Auth from "@components/Auth/Auth";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import { useUser } from "@context/user/useUser";
import { FormControlLabel, Radio, RadioGroup, RadioProps } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import { DecideWrapper } from "./DecisionPage.sc";
import { addDecision, getOptions, getPoll } from "./pollData.gql";

const OrangeRadio = withStyles({
    root: {
        color: "black",
        "&$checked": {
            color: "black",
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const DecisionPage: FunctionComponent = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { pollId } = useParams();

    const [optionId, setOption] = useState<string>();
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const userId = user?.id;

    const poll = useQuery<GQLQuery>(getPoll, { variables: { data: { pollId } } });
    const pollData = poll.data ? poll.data.getPoll : null;

    const options = useQuery<GQLQuery>(getOptions, { variables: { data: { pollId } } });
    const optionsData = options.data ? options.data.getOptionsForPoll : [];

    const [data] = useMutation(addDecision, { variables: { data: { user: userId, poll: pollId, option: optionId, answer: 0.6 } } });

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(`${window.location.origin}/join/${pollId}`);
        setShowNotification(true);
    };

    const sendDecision = async () => {
        const res = await data();
        if (!res.errors) {
            navigate(`/result/${pollId}`);
        }
    };

    return (
        <Auth>
            <>{pollData?.title && <Headline type="h2">{pollData.title}</Headline>}</>
            <DecideWrapper>
                <Headline type="h3">{t("decision.options")}</Headline>
                <RadioGroup onChange={(e) => setOption(e.target.value)} aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                    {optionsData.map((option: GQLOption) => (
                        <FormControlLabel key={option.id} value={option.id} control={<OrangeRadio required={true} />} label={option.title} />
                    ))}
                </RadioGroup>
            </DecideWrapper>
            <>
                <LinkButton onClick={sendDecision} arrow={false} active={true} title={""}>
                    {t("decision.vote")}
                </LinkButton>
                <LinkButton onClick={copyToClipBoard} arrow={false} active={true} title={""}>
                    {t("decision.copyLink")}
                </LinkButton>
                {showNotification && (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        {t("decision.linkCopied")}
                    </Alert>
                )}
            </>
        </Auth>
    );
};

export default DecisionPage;
