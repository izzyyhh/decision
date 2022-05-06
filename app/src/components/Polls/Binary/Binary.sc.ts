import styled from "styled-components";

interface Props {
    active: boolean;
}

export const Option = styled.p<Props>`
    font-size: 20px;
    position: relative;
    padding-left: 15px;
    color: ${({ theme, active }) => (active ? theme.palette.secondary.light : theme.palette.secondary.dark)};
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 7.5px;
        height: 7.5px;
        background: ${({ theme, active }) => (active ? theme.palette.secondary.light : theme.palette.secondary.dark)};
        margin-top: auto;
        margin-bottom: auto;
        border-radius: 50%;
    }
`;
