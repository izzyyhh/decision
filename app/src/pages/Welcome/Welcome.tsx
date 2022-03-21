import { ColumnFullWidth } from "@app/common/Column.sc";
import { Eyebrow } from "@app/common/Eyebrow.sc";
import { AppRoutes } from "@app/Router";
import Headline from "@components/Headline/Headline";
import ImageTextSwiper from "@components/ImageTextSwiper/ImageTextSwiper";
import LinkButton from "@components/LinkButton/LinkButton";
import RecentActivity from "@components/RecentActivity/RecentActivity";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Column } from "./Welcome.sc";

const Welcome: FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <>
            <ColumnFullWidth>
                <Headline type="h2">{t("welcome.headline")}</Headline>
            </ColumnFullWidth>
            <ColumnFullWidth>
                <Eyebrow>{t("welcome.helpText")}</Eyebrow>
            </ColumnFullWidth>
            <Column>
                <ColumnFullWidth>
                    <LinkButton active={true} link={AppRoutes.Poll}>
                        {t("welcome.links.create")}
                    </LinkButton>
                </ColumnFullWidth>
                <ColumnFullWidth>
                    <LinkButton active={true} link={AppRoutes.JoinByPoll}>
                        {t("welcome.links.join")}
                    </LinkButton>
                </ColumnFullWidth>
            </Column>
            <Column>
                <ColumnFullWidth>
                    <Headline type="h3">Presets</Headline>
                </ColumnFullWidth>
                <ColumnFullWidth>
                    <Eyebrow>Pick a decision with predefined options</Eyebrow>
                </ColumnFullWidth>
                <ColumnFullWidth>
                    <ImageTextSwiper />
                </ColumnFullWidth>
            </Column>
            <Column>
                <ColumnFullWidth>
                    <Headline type="h3">Recent Activity</Headline>
                </ColumnFullWidth>
                <ColumnFullWidth>
                    <Eyebrow>Don’t waste time. Make fast decisions.</Eyebrow>
                </ColumnFullWidth>
                <ColumnFullWidth>
                    <RecentActivity />
                </ColumnFullWidth>
            </Column>
        </>
    );
};

export default Welcome;
