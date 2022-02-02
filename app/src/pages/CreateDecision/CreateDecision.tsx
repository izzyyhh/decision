import BreadCrumb from "@components/Breadcrumb/BreadCrumb";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import { HeadlineWrapper } from "@pages/Auth/Auth.sc";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { BreadCrumbWrapper, ButtonWrapper, CreateDecisionWrapper } from "./CreateDecision.sc";

const CreateDecision: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <CreateDecisionWrapper>
            <HeadlineWrapper>
                <Headline type="h2">{t("decision.headline")}</Headline>
            </HeadlineWrapper>
            <BreadCrumbWrapper>
                <BreadCrumb>{t("decision.type")}</BreadCrumb>
            </BreadCrumbWrapper>
            <ButtonWrapper>
                <LinkButton arrow={true} link={"/pol/binary"} icon={"add"}>
                    {t("decision.binary")}
                </LinkButton>
                <LinkButton arrow={true} link={"/pol/tinder"} icon={"add"}>
                    {t("decision.tinder")}
                </LinkButton>
                <LinkButton arrow={true} link={"/pol/date"} icon={"add"}>
                    {t("decision.date")}
                </LinkButton>
                <LinkButton arrow={false} link={"/pol/numerical"} icon={"add"}>
                    {t("decision.numerical")}
                </LinkButton>
            </ButtonWrapper>
        </CreateDecisionWrapper>
    );
};

export default CreateDecision;
