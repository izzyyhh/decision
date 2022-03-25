import { useQuery } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { GQLQuery } from "@app/graphql.generated";
import Auth from "@components/Auth/Auth";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getPoll } from "@pages/DecisionPage/pollData.gql";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const Join: FunctionComponent = () => {
    const { pollId } = useParams();
    const { t } = useTranslation();
    const url = `/decision/${pollId}`;
    const urlResult = `/result/${pollId}`;
    const poll = useQuery<GQLQuery>(getPoll, { variables: { data: { pollId } } });
    const pollData = poll.data ? poll.data.getPoll : null;
    const [showNotification, setShowNotification] = useState<boolean>(false);

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(`${window.location.origin}/join/${pollId}`);
        setShowNotification(true);
    };

    return (
        <Auth>
            <ColumnFullWidth>{pollData?.title && <Headline type="h2">{pollData.title}</Headline>}</ColumnFullWidth>
            <ColumnFullWidth>
                <LinkButton active={true} arrow={true} link={url} primary={true}>
                    {t("decision.vote")}
                </LinkButton>
            </ColumnFullWidth>
            <ColumnFullWidth>
                <LinkButton active={true} arrow={true} link={urlResult} primary={true}>
                    Result
                </LinkButton>
            </ColumnFullWidth>
            <ColumnFullWidth>
                <LinkButton onClick={copyToClipBoard} arrow={true} active={true}>
                    {t("decision.copyLink")}
                </LinkButton>
                {showNotification && (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        {t("decision.linkCopied")}
                    </Alert>
                )}
            </ColumnFullWidth>
        </Auth>
    );
};

export default Join;
