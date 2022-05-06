import { ColumnFullWidth } from "@app/common/Column.sc";
import { Eyebrow } from "@app/common/Eyebrow.sc";
import Seo from "@app/seo/Seo";
import Auth from "@components/Auth/Auth";
import Headline from "@components/Headline/Headline";
import RecentActivity from "@components/RecentActivity/RecentActivity";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Column } from "../Welcome/Welcome.sc";

const AccountPage: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <>
            <Seo title={t("decision.headline")} />
            <Auth>
                <Column>
                    <ColumnFullWidth>
                        <Headline type="h3">{t("welcome.recentActivity.headline")}</Headline>
                    </ColumnFullWidth>
                    <ColumnFullWidth>
                        <Eyebrow>{t("welcome.recentActivity.eyebrow")}</Eyebrow>
                    </ColumnFullWidth>
                    <ColumnFullWidth>
                        <RecentActivity limit={20} />
                    </ColumnFullWidth>
                </Column>
            </Auth>
        </>
    );
};

export default AccountPage;
