import LinkButton from "@components/LinkButton/LinkButton";
import { buildUrl, useSearchParams } from "@utils/urlHelpers";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

const Join: FunctionComponent = () => {
    const [params] = useSearchParams();
    const pid = params.get("q");
    const { t } = useTranslation();
    const url = buildUrl("/decision", { q: pid });
    return (
        <>
            <LinkButton active={true} arrow={true} link={url} primary={true} icon="add">
                {t("decision.vote")}
            </LinkButton>
        </>
    );
};

export default Join;
