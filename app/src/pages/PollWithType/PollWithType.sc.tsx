import styled from "styled-components";

export const CreatePollWithTypeWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: auto;
`;

export const HeadlineWrapper = styled.div`
    margin-top: 40px;
    grid-column: 2 / span 22;
    grid-row: 1;
`;

export const ButtonWrapper = styled.div`
    grid-column: 2 / span 22;
    grid-row: 8;
    margin-top: 100px;
`;

export const BreadCrumbWrapper = styled.div`
    grid-column: 2 / span 22;
    grid-row: 3;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: centerflex-start;
`;

export const HelpText = styled.div`
    margin-top: 10px;
    grid-column: 2 / span 22;
    grid-row: 4;
    font-size: 18px;
    line-height: 24px;
    font-family: Roboto;
    font-style: normal;
    font-weight: light;
`;

export const QuestionInput = styled.input`
    grid-column: 2 / span 22;
    grid-row: 5;
    margin-top: 100px;
    margin-bottom: 50px;
    border: 0;
    position: relative;
    border-bottom: 1px solid black;
    font-size: 22px;
`;

export const OptionWrapper = styled.div`
    grid-column: 2 / span 22;
    grid-row: 6;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const Input = styled.input`
    border: 0;
    position: relative;
    font-size: 22px;
    width: 100%;
    margin-left: 20px;
    color: lightgrey;
`;

export const OptionListWrapper = styled.div`
    grid-column: 2 / span 22;
    grid-row: 7;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
