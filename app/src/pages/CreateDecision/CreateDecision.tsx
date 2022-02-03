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
                <LinkButton link={"/binary"} icon={"add"}>{t("decision.binary")}</LinkButton>
                <LinkButton link={"/tinder"} icon={"add"}>{t("decision.tinder")}</LinkButton>
                <LinkButton link={"/date"} icon={"add"}>{t("decision.date")}</LinkButton>
                <LinkButton link={"/numerical"} icon={"add"}>{t("decision.numerical")}</LinkButton>
            </ButtonWrapper>
        </CreateDecisionWrapper>
    );
};

export default CreateDecision;
