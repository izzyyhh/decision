import Input from "@components/Input/Input";
import { DialogContentText } from "@material-ui/core";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import styled from "styled-components";

export const Title = styled.p`
    margin: 0;
    text-align: center;
    font-size: 20px;
    font-weight: 500px;
    color: white;
`;

export const ModalInput = styled(Input)`
    && {
        label {
            color: white;
        }
    }
`;

export const ContentText = styled(DialogContentText)`
    && {
        color: white;
    }
`;

export const StyledButton = styled(Button)`
    && {
        color: white !important;
    }
`;

export const StyledFormControl = styled(FormControl)`
    color: white !important;
`;
