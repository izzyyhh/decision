import BreadCrumb from "@components/Breadcrumb/BreadCrumb";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import { PageContainer } from "@theme/common.sc";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Logo } from "./Welcome.sc";

const Welcome: FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <PageContainer>
            <Headline type="h2">{t("welcome.headline")}</Headline>
            <BreadCrumb>{t("welcome.helpText")}</BreadCrumb>
            <Logo />
            <LinkButton icon="add" arrow={true} active={true} link="/poll">
                {t("welcome.links.create")}
            </LinkButton>
            <LinkButton icon="add" arrow={true} active={false}>
                {t("welcome.links.predefined")}
            </LinkButton>
            <LinkButton icon="add" arrow={true} active={false}>
                {t("welcome.links.join")}
            </LinkButton>
            <LinkButton icon="add" arrow={true} active={false}>
                {t("welcome.links.about")}
            </LinkButton>
        </PageContainer>
    );
};

export default Welcome;
