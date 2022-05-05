import styled from "styled-components";

export const Column = styled.div`
    margin-top: 25px;
    grid-column: span 24;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: auto;
`;
