import { useQuery } from "@apollo/client";
import { GQLQuery } from "@app/graphql.generated";
import { CustomModal } from "@components/Modals/QRModal";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import Fab from "@mui/material/Fab";
import { getQRCode } from "@pages/DecisionPage/pollData.gql";
import React, { FunctionComponent, useState } from "react";

import { NavigatorShareWrapper, ShareWrapper } from "./Share.sc";
import SocialShare from "./SocialShare";
import { ShareIcon } from "./SocialShare.sc";

interface Props {
    url: string;
}

const Share: FunctionComponent<Props> = ({ url }) => {
    const qrCodeData = useQuery<GQLQuery>(getQRCode, { variables: { data: { shareLink: url } } });
    const qrCodeBase64 = qrCodeData.data?.getQRCode.id;

    const [openModal, setOpenModal] = useState(false);
    const handleClickOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    let imageReady = false;
    if (typeof qrCodeBase64 === "string") {
        imageReady = true;
    }

    const navigatorShare = () => {
        navigator.share({
            title: "Dast - Decide fast",
            text: "Join the decision",
            url: url,
        });
    };

    let ShareButton = (
        <ShareWrapper>
            <Fab size="small">{SocialShare({ url })}</Fab>
        </ShareWrapper>
    );

    if (navigator.share != undefined) {
        ShareButton = (
            <NavigatorShareWrapper>
                <Fab size="small" onClick={navigatorShare}>
                    <ShareIcon></ShareIcon>
                </Fab>
                <Fab size="small" onClick={handleClickOpenModal}>
                    <QrCode2OutlinedIcon fontSize="medium"></QrCode2OutlinedIcon>
                </Fab>
                <CustomModal openModal={openModal} handleClose={handleCloseModal}>
                    {imageReady && <img alt="qrcode" src={qrCodeBase64}></img>}
                </CustomModal>
            </NavigatorShareWrapper>
        );
    }

    return ShareButton;
};

export default Share;
