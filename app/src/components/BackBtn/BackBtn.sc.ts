import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styled from "styled-components";

export const Back = styled(ArrowBackIcon)`
    && {
        position: absolute;
        top: -30px;
        color: white;
        width: 1.2em;
        height: 1.2em;
        cursor: pointer;
        display: none;

        @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
            display: block;
        }
    }
`;
