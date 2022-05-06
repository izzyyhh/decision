import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import LinkButton from "@components/LinkButton/LinkButton";
import Modal from "@components/Modals/Modal";
import { useSnack } from "@context/snackbar/useSnack";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import { getQRCode } from "@pages/DecisionPage/pollData.gql";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { EmailShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";

import { ArrowIcon, Image, Links, QRCodeWrapper, ShareBar, Title } from "./ShareModal.sc";

interface Props {
    pollId: string;
}

const ShareModal: FunctionComponent<Props> = ({ pollId }) => {
    const [open, setOpen] = useState<boolean>(pollId.length > 0);
    const shareLink = `${window.location.origin}/decision/${pollId}`;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setSnack } = useSnack();
    const [showQR, setShowQr] = useState<boolean>(false);
    const qrCodeData = useQuery<GQLQuery>(getQRCode, { variables: { data: { shareLink } } });
    const qrCodeBase64 = qrCodeData.data?.getQRCode.id;

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(shareLink);
        setSnack({ message: t("decision.linkCopied"), severity: "info", open: true });
    };

    return (
        <Modal open={open} setOpen={(value: boolean) => setOpen(value)}>
            <Title visible={showQR}>{t("link.social.share")}</Title>
            <ShareBar visible={showQR}>
                <WhatsappShareButton url={shareLink} title={t("link.social.join")} separator=": ">
                    <WhatsAppIcon />
                </WhatsappShareButton>
                <TelegramShareButton url={shareLink} title={t("link.social.join")}>
                    <TelegramIcon />
                </TelegramShareButton>
                <EmailShareButton url={shareLink} subject={t("link.social.join")} title={t("link.social.join")}>
                    <MailOutlineIcon />
                </EmailShareButton>
                <QrCode2OutlinedIcon onClick={() => setShowQr(true)} />
                <LinkOutlinedIcon onClick={copyToClipBoard} />
            </ShareBar>
            <Links visible={showQR}>
                <LinkButton active={true} onClick={() => navigate(`/decision/${pollId}`)}>
                    {t("create.links.start")}
                </LinkButton>
                <LinkButton active={true} onClick={() => navigate(`/result/${pollId}`)}>
                    {t("create.links.result")}
                </LinkButton>
            </Links>
            <QRCodeWrapper visible={showQR}>
                <ArrowIcon onClick={() => setShowQr(false)} />
                <Image src={qrCodeBase64} alt="QR Code" />
            </QRCodeWrapper>
        </Modal>
    );
};

export default ShareModal;
