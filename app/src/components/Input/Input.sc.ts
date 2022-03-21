import { TextField as MuiTextField } from "@material-ui/core";
import styled from "styled-components";

export const TextField = styled(MuiTextField)`
    && {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        font-size: 24px;

        .MuiInput-underline {
            &:before {
                border-bottom-color: ${({ theme }) => theme.palette.secondary.light};
            }
        }
    }
`;
