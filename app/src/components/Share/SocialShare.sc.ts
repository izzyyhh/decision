import { CircleMenu as CircleShareMenu } from "react-circular-menu";
import styled from "styled-components";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Share from "@material-ui/icons/Share";

export const CircleMenu = styled(CircleShareMenu)`
    && {
        position: relative;
        button {
            padding: 0.4rem;
            position: relative;
            border: none;
            background: transparent;
            div {
                display: none;
            }
            display: flex;
        }
    }
`;

export const ShareIcon = styled(Share)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: -3px;
    right: 0;
    margin: auto;
    color: black;
    background: transparent;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    padding: 0.4rem;
`;

export const ShareOutlineIcon = styled(ShareOutlinedIcon)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: -3px;
    right: 0;
    margin: auto;
    color: black;
    background: transparent;
    width: 2rem;
    padding: 0.4rem;
    height: 2rem;
    border-radius: 50%;
`;

export const SocialShareWrapper = styled.div`
    position: relative;
    width: max-content;
    background: white;
    border-radius: 50%;
    ul {
        li {
            background: white;
            border-radius: 50%;
        }
        button:hover {
            color: black !important;
            background: white;
        }
        button:active {
            color: black;
        }
    }
`;
