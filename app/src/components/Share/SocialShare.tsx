import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import React, { FunctionComponent, useState } from "react";
import { CircleMenuItem } from "react-circular-menu";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";

import { CircleMenu, ShareIcon, ShareOutlineIcon, SocialShareWrapper } from "./SocialShare.sc";

interface Props {
    url: string;
}

const SocialShare: FunctionComponent<Props> = ({ url }) => {
    const [open, setOpen] = useState(false);
    let Icon = <ShareIcon fontSize="medium"></ShareIcon>;

    if (open) {
        Icon = <ShareOutlineIcon fontSize="medium"></ShareOutlineIcon>;
    }

    return (
        <SocialShareWrapper>
            {Icon}
            <CircleMenu className="sharebutton" startAngle={-90} rotationAngle={300} itemSize={1.5} radius={3} onMenuToggle={() => setOpen(!open)}>
                <CircleMenuItem tooltip={"Facebook"}>
                    <FacebookShareButton quote="Join the decision." hashtag="#decidefast" url={url}>
                        <FacebookIcon size={40} round></FacebookIcon>
                    </FacebookShareButton>
                </CircleMenuItem>
                <CircleMenuItem tooltip={"WhatsApp"}>
                    <WhatsappShareButton url={url} title="Join the decision!" separator=": ">
                        <WhatsappIcon size={40} round></WhatsappIcon>
                    </WhatsappShareButton>
                </CircleMenuItem>
                <CircleMenuItem tooltip={"Twitter"} menuActive={open}>
                    <TwitterShareButton url={url}>
                        <TwitterIcon size={40} round></TwitterIcon>
                    </TwitterShareButton>
                </CircleMenuItem>
                <CircleMenuItem tooltip={"Telegram"} menuActive={open}>
                    <TelegramShareButton url={url} title="Join the decision!">
                        <TelegramIcon size={40} round></TelegramIcon>
                    </TelegramShareButton>
                </CircleMenuItem>
                <CircleMenuItem tooltip={"Email"} menuActive={open}>
                    <EmailShareButton url={url} subject="Join the decision!" title="Join the decision!">
                        <EmailIcon size={40} round></EmailIcon>
                    </EmailShareButton>
                </CircleMenuItem>
                <CircleMenuItem tooltip={"QR Code"} menuActive={open} style={{}}>
                    <QrCode2OutlinedIcon fontSize="medium"></QrCode2OutlinedIcon>
                </CircleMenuItem>
            </CircleMenu>
        </SocialShareWrapper>
    );
};

export default SocialShare;
