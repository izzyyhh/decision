import { ColumnFullWidth } from "@app/common/Column.sc";
import { Eyebrow } from "@app/common/Eyebrow.sc";
import { AppRoutes } from "@app/Router";
import Seo from "@app/seo/Seo";
import Auth from "@components/Auth/Auth";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import PresetSlider from "@components/PresetSlider/PresetSlider";
import RecentActivity from "@components/RecentActivity/RecentActivity";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Column } from "./Welcome.sc";

const Welcome: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <>
            <Seo />
            <Auth>
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
                        <PresetSlider />
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
            </Auth>
        </>
    );
};

export default Welcome;
