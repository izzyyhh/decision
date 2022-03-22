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
`;

export const ButtonContainer = styled.div`
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
