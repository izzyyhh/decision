import { useQuery } from "@apollo/client";
import { ColumnFullWidth } from "@app/common/Column.sc";
import { GQLQuery } from "@app/graphql.generated";
import Seo from "@app/seo/Seo";
import Auth from "@components/Auth/Auth";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import Polls from "@components/Polls/Polls";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { getPoll, getQRCode } from "./pollData.gql";

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

    const shareLink = `${window.location.origin}/decision/${pollId}`;
    const qrCodeData = useQuery<GQLQuery>(getQRCode, { variables: { data: { shareLink } } });
    const qrCodeBase64 = qrCodeData.data?.getQRCode.id;

    let imageReady = false;
    if (typeof qrCodeBase64 === "string") {
        imageReady = true;
    }

    const pollType = poll.data?.getPoll.type;

    return (
        <>
            <Seo title={pollData?.title} />
            <Auth>
                <ColumnFullWidth>
                    <>{pollData?.title && <Headline type="h2">{pollData.title}</Headline>}</>
                </ColumnFullWidth>
                <Polls poll={pollType} />
                <ColumnFullWidth>
                    <LinkButton onClick={copyToClipBoard} arrow={false} active={true} title={""}>
                        {t("decision.copyLink")}
                    </LinkButton>
                    {showNotification && (
                        <Alert severity="info">
                            <AlertTitle>Info</AlertTitle>
                            {t("decision.linkCopied")}
                        </Alert>
                    )}
                    {imageReady && <img src={qrCodeBase64}></img>}
                </ColumnFullWidth>
            </Auth>
        </>
    );
};

export default DecisionPage;
