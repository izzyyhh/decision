import styled from "styled-components";

export const Wrapper = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
`;

interface Props {
    active: boolean;
}

export const Item = styled.p<Props>`
    margin: 0;
    font-size: 14px;
    font-weight: 300;
    padding-left: 20px;
    position: relative;
    color: ${({ active, theme }) => (active ? theme.palette.text.primary : theme.palette.text.secondary)};
    cursor: pointer;

    &:last-of-type {
        margin-right: 10px;
    }

    &:before {
        content: "";
        position: absolute;
        width: 7.5px;
        height: 7.5px;
        background-color: ${({ active, theme }) => (active ? theme.palette.text.primary : theme.palette.text.secondary)};
        left: 0;
        top: 0;
        bottom: 0;
        margin-left: 5px;
        margin-bottom: auto;
        margin-top: auto;
        margin-right: auto;
        border-radius: 50%;
    }
`;
