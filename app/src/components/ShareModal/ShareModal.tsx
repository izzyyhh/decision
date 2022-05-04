import LinkButton from "@components/LinkButton/LinkButton";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { EmailShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";

import { Body, Links, Modal, ShareBar, Title } from "./ShareModal.sc";

interface Props {
    pollId: string;
}

const ShareModal: FunctionComponent<Props> = ({ pollId }) => {
    const shareLink = `${window.location.origin}/decision/${pollId}`;
    const { t } = useTranslation();
    const navigate = useNavigate();

    if (pollId.length < 1) {
        return <></>;
    }

    return (
        <Modal open={true}>
            <Body>
                <Title>{t("link.social.share")}</Title>
                <ShareBar>
                    <WhatsappShareButton url={shareLink} title={t("link.social.join")} separator=": ">
                        <WhatsAppIcon />
                    </WhatsappShareButton>
                    <TelegramShareButton url={shareLink} title={t("link.social.join")}>
                        <TelegramIcon />
                    </TelegramShareButton>
                    <EmailShareButton url={shareLink} subject={t("link.social.join")} title={t("link.social.join")}>
                        <MailOutlineIcon />
                    </EmailShareButton>
                </ShareBar>
                <Links>
                    <LinkButton active={true} onClick={() => navigate(`/decision/${pollId}`)}>
                        {t("create.links.start")}
                    </LinkButton>
                    <LinkButton active={true} onClick={() => navigate(`/result/${pollId}`)}>
                        {t("create.links.result")}
                    </LinkButton>
                </Links>
            </Body>
        </Modal>
    );
};

export default ShareModal;
