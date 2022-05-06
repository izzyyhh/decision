import Input from "@components/Input/Input";
import styled from "styled-components";

export const CreateDecisionWrapper = styled.div`
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
    grid-row: 4;
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

export const StyledInput = styled(Input)`
    && {
        margin-top: -10px !important;

        &.MuiFormControl-root {
            margin-top: -10px !important;
        }
    }
`;
