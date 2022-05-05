import styled from "styled-components";

export const Title = styled.h3`
    font-size: 22px;
`;

export const Box = styled.div`
    margin-top: 2rem;
    background-color: #2c2b2d;
    padding: 2rem;
    color: #e8e8e8;
    grid-column: 2 / span 20;
    border-radius: 10px;
    padding-bottom: 2.5rem;
`;

export const BoxHeader = styled.h3`
    font-size: 1.8rem;
    font-weight: regular;
    margin: 0 0 1rem 0;
    font-weight: 400;
`;

export const ColumnFullWidth = styled.div`
    font-family: Open Sans;
    grid-column: 2 / span 22;
`;

export const OptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    font-weight: 100;
`;

export const StatBar = styled.div`
    height: 45px;
    border-radius: 10px;
    background-color: #4b4b53;
`;

export const StatBarFiller = styled.div`
    background-color: #57a8e2;
    height: 100%;
    width: 0%;
    border-radius: 10px;
    transition: 1s;
    transition-timing-function: ease-out;
`;

export const OptionTitle = styled.p`
    margin: 1rem 0;
`;

export const OptionPercentage = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    padding-left: 1rem;
    color: white;
`;

export const ButtonContainer = styled.div`
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Image = styled.img`
    width: 100%;
    height: 80px;
    object-fit: cover;
    postion: relative;
    border-radius: 10px;
    margin-top: 10px;
`;

export const TinderResultTextWrapper = styled.div`
    width: 100%;
    color: white;
    padding: 0px 0px 45px 0px;
    margin-top: -50px;
    border-radius: 10px;
    position: relative;
    margin-bottom: 10px;
`;

export const TinderResultTextBackdrop = styled.div`
    width: 100%;
    position: absolute;
    content: "";
    bottom: 0;
    height: 100%;
    background: rgb(0, 0, 0);
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%);
    border-radius: 10px;
`;

export const TinderResultText = styled.div`
    color: white;
    font-size: 1.3rem;
    font-weight: 100;
    padding: 0px 10px;
`;
