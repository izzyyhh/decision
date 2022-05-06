import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styled from "styled-components";

interface Props {
    visible: boolean;
}

export const Title = styled.p<Props>`
    margin: 0;
    text-align: center;
    font-size: 20px;
    font-weight: 500px;
    color: white;
    display: ${({ visible }) => (visible ? "none" : "block")};
`;

export const ShareBar = styled.div<Props>`
    margin-top: 15px;
    justify-content: space-around;
    padding-bottom: 15px;
    padding-top: 15px;
    display: ${({ visible }) => (visible ? "none" : "flex")};

    svg {
        color: white;
    }
`;

export const Links = styled.div<Props>`
    margin-top: 30px;
    display: ${({ visible }) => (visible ? "none" : "block")};
`;

export const QRCodeWrapper = styled.div<Props>`
    display: ${({ visible }) => (visible ? "flex" : "none")};
    justify-content: center;
    flex-direction: column;
`;

export const ArrowIcon = styled(ArrowBackIcon)`
    margin-right: auto;
    margin-bottom: 15px;
    color: white;
`;

export const Image = styled.img`
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -39px;
`;
