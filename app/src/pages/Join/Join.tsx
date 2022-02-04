import LinkButton from "@components/LinkButton/LinkButton";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const Join: FunctionComponent = () => {
    const {pollId} = useParams();
    const { t } = useTranslation();
    const url = `/decision/${pollId}`;
    return (
        <>
            <LinkButton active={true} arrow={true} link={url} primary={true} icon="add">
                {t("decision.vote")}
            </LinkButton>
        </>
    );
};

export default Join;
