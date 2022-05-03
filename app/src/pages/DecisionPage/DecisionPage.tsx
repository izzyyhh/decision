import { useQuery } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { GQLQuery } from "@app/graphql.generated";
import Auth from "@components/Auth/Auth";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import Polls from "@components/Polls/Polls";
import SocialShare from "@components/Share/SocialShare";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { getPoll } from "./pollData.gql";

const DecisionPage: FunctionComponent = () => {
    const { t } = useTranslation();
    const { pollId } = useParams();

    const [showNotification, setShowNotification] = useState<boolean>(false);

    const poll = useQuery<GQLQuery>(getPoll, { variables: { data: { pollId } } });
    const pollData = poll.data ? poll.data.getPoll : null;
    const url = `${window.location.origin}/join/${pollId}`;

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(url);
        setShowNotification(true);
    };

    const pollType = poll.data?.getPoll.type;

    return (
        <Auth>
            <ColumnFullWidth>
                <>{pollData?.title && <Headline type="h2">{pollData.title}</Headline>}</>
            </ColumnFullWidth>
            <Polls poll={pollType} />
            <ColumnFullWidth>
                <LinkButton onClick={copyToClipBoard} arrow={false} active={true} title={""}>
                    {t("decision.copyLink")}
                </LinkButton>
                <SocialShare url={url}></SocialShare>
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

export default DecisionPage;
