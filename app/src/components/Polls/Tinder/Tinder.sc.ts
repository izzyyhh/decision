import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import * as RTCTinderCard from "react-tinder-card";
import styled, { css } from "styled-components";

interface Props {
    first: boolean;
}

export const TinderCard = styled(RTCTinderCard)`
    && {
        height: max-content !important;
    }
`;

export const Card = styled.div<Props>`
    width: 100%;
    display: block;
    border-radius: 7.5px;
    height: 350px;
    display: block;
    border-radius: 22px;
    overflow: hidden;
    position: relative;
    height: calc(85vh - 150px);
    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        height: 350px;
    }

    ${({ first }) =>
        first &&
        css`
            animation: onBoard 4s 1 linear;
        `}

    @keyframes onBoard {
        0% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
        }
        25% {
            transform: translateX(25px) translateY(-25px) rotate(15deg);
        }
        35% {
            transform: translateX(25px) translateY(-25px) rotate(15deg);
        }
        45 % {
            transform: translateX(-25px) translateY(25px) rotate(-15deg);
        }
        55 % {
            transform: translateX(0px) translateY(0px) rotate(0deg);
        }
        75% {
            transform: translateX(-25px) translateY(-25px) rotate(-15deg);
        }
        100% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
        }
    }

    &:before {
        content: "";
        bottom: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgb(0, 0, 0);
        background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }
`;

export const VoteWrapper = styled.div`
    margin-top: 25px;
    margin-bottom: 2rem;
    position: relative;
    height: calc(85vh - 150px);

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        margin-top: 75px;
        height: 350px;
    }

    .swipe {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 350px;
    }
`;

export const OnBoard = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #b9b9b9;
    opacity: 0;
    display: flex;

    animation: onBoardWrapper 5s 1 linear;

    @keyframes onBoardWrapper {
        0% {
            opacity: 0.4;
        }
        85% {
            opacity: 0.4;
        }
        90% {
            opacity: 0;
        }
    }

    &:after {
        content: "";
        height: 100%;
        border-right: 1px dashed white;
        position: absolute;
        left: 50%;
    }
`;

export const InfoBox = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const HelpText = styled.p`
    text-align: center;
    color: white;
    word-break: break-word;
`;

export const TouchIcon = styled(TouchAppIcon)`
    && {
        color: white;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    postion: relative;
`;

export const Title = styled.p<Props>`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
    font-size: 20px;
    margin-left: 25px;
    margin-right: 25px;
    margin-bottom: 75px;
    display: block;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        font-size: 24px;
    }

    ${({ first }) =>
        first &&
        css`
            animation: onBoardTitle 5s 1 linear;
        `}

    @keyframes onBoardTitle {
        0% {
            opacity: 0;
        }
        85% {
            opacity: 0;
        }
        90% {
            opacity: 1;
        }
    }
`;

export const VoteButtons = styled.div<Props>`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-top: auto;
    margin-bottom: 25px;
    margin-left: 25px;
    margin-right: 25px;
    z-index: 100;
    height: max-content;
    display: flex;
    justify-content: space-between;

    ${({ first }) =>
        first &&
        css`
            animation: onBoardBTN 5s 1 linear;
        `}

    @keyframes onBoardBTN {
        0% {
            opacity: 0;
        }
        85% {
            opacity: 0;
        }
        90% {
            opacity: 1;
        }
    }
`;

export const DownVote = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid red;
    display: flex;
`;

export const UpVote = styled(DownVote)`
    border-color: green;
`;

export const IconClose = styled(CloseIcon)`
    width: 28px;
    height: 28px;
    margin: auto;
    color: red;
`;

export const IconHeart = styled(FavoriteIcon)`
    width: 28px;
    height: 28px;
    margin: auto;
    color: green;
`;
