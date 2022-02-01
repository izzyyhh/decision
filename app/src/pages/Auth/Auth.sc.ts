import styled from "styled-components";

export const AuthWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: auto;
`;

export const HeadlineWrapper = styled.div`
    margin-top: 40px;
    grid-column: 2 / span 22;
    grid-row: 1;
`;

export const UserName = styled.input`
    grid-column: 2 / span 22;
    grid-row: 2;
    margin-top: 200px;
    margin-bottom: 100px;
    border: 0;
    position: relative;
    border-bottom: 1px solid black;
    font-size: 22px;
`;

export const ButtonWrapper = styled.div`
    grid-column: 2 / span 22;
    grid-row: 3;
    margin-top: 100px;
`;
