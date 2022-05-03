import TouchAppIcon from "@material-ui/icons/TouchApp";
import styled, { css } from "styled-components";

interface Props {
    first: boolean;
}

export const Card = styled.div<Props>`
    width: 100%;
    height: 350px;
    background: yellow;
    display: block;
    border-radius: 22px;
    overflow: hidden;
    position: relative;

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
        background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 100%);
        opacity: 0.5;
    }
`;

export const VoteWrapper = styled.div`
    margin-top: 75px;
    margin-bottom: 125px;
    position: relative;
    height: 350px;

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
            opacity: 0.8;
        }
        85% {
            opacity: 0.8;
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
    background: red;
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
    font-size: 24px;
    margin-left: 25px;

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

export const VoteButtons = styled.div`
    margin-top: 375px;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    position: absolute;
    top: 0;
    z-index: 100;
    width: 100%;
`;

export const DownVote = styled.div`
    grid-column: span 5;
`;

export const UpVote = styled.div`
    grid-column: 21 / span 5;
`;
