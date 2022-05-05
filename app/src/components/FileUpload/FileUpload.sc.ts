import CancelIcon from "@material-ui/icons/Cancel";
import styled from "styled-components";

export const Wrapper = styled.div`
    margin-top: 25px;
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.palette.secondary.light};
    position: relative;
    cursor: pointer;
    display: flex;
`;

export const Input = styled.input`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    cursor: pointer;
`;

export const Label = styled.p`
    margin: 0;
    line-height: 24px;
    font-size: 14px;
    margin-left: 20px;
`;

export const Preview = styled(Wrapper)`
    padding: 0;
    border: none;
    cursor: auto;
`;

export const Image = styled.img`
    object-fit: contain;
    width: 100%;
`;

export const Reset = styled(CancelIcon)`
    position: absolute;
    right: -0.5em;
    top: -0.5em;
    cursor: pointer;
    color: black;
`;
