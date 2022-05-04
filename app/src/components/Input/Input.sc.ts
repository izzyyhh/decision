import { TextField as MuiTextField } from "@material-ui/core";
import styled from "styled-components";

export const TextField = styled(MuiTextField)`
    && {
        width: 100%;
        font-size: 14px;

        .MuiInput-underline {
            &:before {
                border-bottom-color: ${({ theme }) => theme.palette.secondary.light};
            }
        }
    }
`;
