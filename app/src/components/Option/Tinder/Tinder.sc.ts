import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import styled from "styled-components";

export const AddButton = styled.div`
    margin-top: 35px;
    width: 100%;
    background: ${({ theme }) => theme.palette.secondary.light};
    border-radius: 22px;
    min-height: 48.5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
`;

export const Add = styled(AddCircleOutlineIcon)`
    && {
        margin: auto;
        color: ${({ theme }) => theme.palette.background.paper};
    }
`;

export const OptionWrapper = styled.div`
    padding-bottom: 25px;
    border-bottom 1px solid white;
`;
