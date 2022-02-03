import LinkButton from "@components/LinkButton/LinkButton";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

const Home: FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <>
            <LinkButton link="/step-1" primary={true} icon="add" title="">
                {t("link.next")}
            </LinkButton>
        </>
    );
};

export default Home;
