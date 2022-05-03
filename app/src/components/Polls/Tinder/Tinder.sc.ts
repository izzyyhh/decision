import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as RTCTinderCard from "react-tinder-card";
import styled from "styled-components";

interface Props {
    active: boolean;
}

export const TinderCard = styled(RTCTinderCard)`
    && {
        height: max-content !important;
    }
`;

export const Card = styled.div<Props>`
    width: 100%;
    display: ${({ active }) => (active ? "block" : "none")};
    border-radius: 7.5px;
    overflow: hidden;
    position: relative;
    height: calc(85vh - 150px);
    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        height: 350px;
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
    margin-bottom: 125px;
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

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    postion: relative;
`;

export const Title = styled.p`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
    font-size: 20px;
    margin-left: 25px;
    margin-right: 25px;
    margin-bottom: 75px;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        font-size: 24px;
    }
`;

export const VoteButtons = styled.div`
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
