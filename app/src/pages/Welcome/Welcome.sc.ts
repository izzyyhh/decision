import styled from "styled-components";

export const Column = styled.div`
    margin-top: 80px;
    margion-bottom: 80px;
    grid-column: span 24;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: auto;
`;
