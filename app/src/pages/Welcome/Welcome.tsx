import { ColumnFullWidth } from "@app/common/Column.sc";
import { Eyebrow } from "@app/common/Eyebrow.sc";
import { AppRoutes } from "@app/Router";
import Seo from "@app/seo/Seo";
import Auth from "@components/Auth/Auth";
import Headline from "@components/Headline/Headline";
import LinkButton from "@components/LinkButton/LinkButton";
import { CustomModal } from "@components/Modals/QRModal";
import PresetSlider from "@components/PresetSlider/PresetSlider";
import RecentActivity from "@components/RecentActivity/RecentActivity";
import { QrCodeWrapper } from "@pages/Join/Join.sc";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { QrReader } from "react-qr-reader";

import { Column } from "./Welcome.sc";

const Welcome: FunctionComponent = () => {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(false);

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

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
                        <LinkButton classProp={"decision-create"} active={true} link={AppRoutes.Poll}>
                            {t("welcome.links.create")}
                        </LinkButton>
                    </ColumnFullWidth>
                    <ColumnFullWidth>
                        <LinkButton active={true} arrow={false} primary={true} onClick={handleClickOpenModal}>
                            {t("welcome.links.join")}
                        </LinkButton>
                        <CustomModal openModal={openModal} handleClose={handleCloseModal}>
                            <QrCodeWrapper>
                                <QrReader
                                    className="test"
                                    constraints={{ facingMode: "environment" }}
                                    onResult={(result, error) => {
                                        if (result) {
                                            if (result.getText().includes(window.location.origin)) {
                                                window.location.href = result.getText();
                                            }
                                        }

                                        if (error) {
                                            console.info(error);
                                        }
                                    }}
                                />
                            </QrCodeWrapper>
                        </CustomModal>
                    </ColumnFullWidth>
                </Column>
                <Column>
                    <ColumnFullWidth>
                        <Headline type="h3">{t("welcome.presets.headline")}</Headline>
                    </ColumnFullWidth>
                    <ColumnFullWidth>
                        <Eyebrow>{t("welcome.presets.eyebrow")}</Eyebrow>
                    </ColumnFullWidth>
                    <ColumnFullWidth>
                        <PresetSlider />
                    </ColumnFullWidth>
                </Column>
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

export default Welcome;
