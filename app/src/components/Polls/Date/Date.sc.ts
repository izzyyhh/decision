import styled from "styled-components";

interface Props {
    active: boolean;
}

export const Option = styled.input<Props>`
    
`;

export const Label = styled.label<Props>`
    font-size: 20px;
    position: relative;
    padding-left: 15px;
    color: ${({ theme, active }) => (active ? theme.palette.primary.light : theme.palette.secondary.light)};
    cursor: pointer;
`;

export const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
`;


