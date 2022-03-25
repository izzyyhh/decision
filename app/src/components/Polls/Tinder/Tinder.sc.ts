import styled from "styled-components";

interface Props {
    active: boolean;
}

export const Card = styled.div<Props>`
    width: 100%;
    height: 350px;
    background: yellow;
    display: ${({ active }) => (active ? "block" : "none")};
    border-radius: 22px;
    overflow: hidden;
    position: relative;

    &:before {
        content: "";
        bottom: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgb(0, 0, 0);
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
    font-size: 24px;
    margin-left: 25px;
`;

export const VoteButtons = styled.div`
    margin-top: 300px;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
`;

export const DownVote = styled.div`
    grid-column: span 5;
`;

export const UpVote = styled.div`
    grid-column: 20 / span 5;
`;
