import Headline from "@components/Headline/Headline";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

const Result: FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <>
            <Headline type="h2">{t("result.headline")}</Headline>
        </>
    );
};

export default Result;