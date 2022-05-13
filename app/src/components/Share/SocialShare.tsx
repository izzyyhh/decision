import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import { CustomModal } from "@components/Modals/QRModal";
import { useSnack } from "@context/snackbar/useSnack";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import { getQRCode } from "@pages/DecisionPage/pollData.gql";
import React, { FunctionComponent, useState } from "react";
import { CircleMenuItem } from "react-circular-menu";
import { useTranslation } from "react-i18next";
import { EmailIcon, EmailShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

import { CircleMenu, ShareIcon, ShareOutlineIcon, SocialShareWrapper } from "./SocialShare.sc";

interface Props {
    url: string;
}

const SocialShare: FunctionComponent<Props> = ({ url }) => {
    const [open, setOpen] = useState(false);
    const { setSnack } = useSnack();
    const { t } = useTranslation();
    const qrCodeData = useQuery<GQLQuery>(getQRCode, { variables: { data: { shareLink: url } } });
    const qrCodeBase64 = qrCodeData.data?.getQRCode.id;

    let imageReady = false;
    if (typeof qrCodeBase64 === "string") {
        imageReady = true;
    }

    //qr code modal
    const [openModal, setOpenModal] = useState(false);
    const handleClickOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(url);
        setSnack({ message: t("decision.linkCopied"), severity: "info", open: true });
    };

    let Icon = <ShareIcon fontSize="medium"></ShareIcon>;

    if (open) {
        Icon = <ShareOutlineIcon fontSize="medium"></ShareOutlineIcon>;
    }

    return (
        <SocialShareWrapper>
            {Icon}
            <CircleMenu className="sharebutton" startAngle={105} rotationAngle={150} itemSize={1.5} radius={3} onMenuToggle={() => setOpen(!open)}>
                <CircleMenuItem tooltip={"WhatsApp"}>
                    <WhatsappShareButton url={url} title="Join the decision!" separator=": ">
                        <WhatsappIcon size={40} round></WhatsappIcon>
                    </WhatsappShareButton>
                </CircleMenuItem>
                {/* <CircleMenuItem tooltip={"Telegram"} menuActive={open}>
                    <TelegramShareButton url={url} title="Join the decision!">
                        <TelegramIcon size={40} round></TelegramIcon>
                    </TelegramShareButton>
                </CircleMenuItem> */}
                <CircleMenuItem tooltip={"Email"} menuActive={open}>
                    <EmailShareButton url={url} subject="Join the decision!" title="Join the decision!">
                        <EmailIcon size={40} round></EmailIcon>
                    </EmailShareButton>
                </CircleMenuItem>
                <CircleMenuItem tooltip={"QR Code"} menuActive={open} onClick={handleClickOpenModal}>
                    <QrCode2OutlinedIcon fontSize="medium"></QrCode2OutlinedIcon>
                </CircleMenuItem>
                <CircleMenuItem tooltip={"Copy link"} menuActive={open} onClick={copyToClipBoard}>
                    <LinkOutlinedIcon fontSize="medium"></LinkOutlinedIcon>
                </CircleMenuItem>
            </CircleMenu>
            <CustomModal openModal={openModal} handleClose={handleCloseModal}>
                {imageReady && <img alt="qrcode" src={qrCodeBase64}></img>}
            </CustomModal>
        </SocialShareWrapper>
    );
};

export default SocialShare;
