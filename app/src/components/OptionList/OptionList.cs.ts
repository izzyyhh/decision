import styled from "styled-components";

export const Input = styled.input`
    border: 0;
    position: relative;
    font-size: 22px;
    width: 100%;
    color: black;
    background-color: lightgrey;
`;

export const ListElement = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: lightgrey;
    padding: 15px 20px;
    border-radius: 4px;
    margin-bottom: 20px;
`;

export const List = styled.ul`
    grid-column: 2 / span 22;
    grid-row: 1;
    width: 100%;
    padding-inline-start: 0px;
`;
