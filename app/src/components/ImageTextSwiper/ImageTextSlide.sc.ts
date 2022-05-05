import styled from "styled-components";

export const SlideInner = styled.div`
    border-radius: 7.5px;
    background: ${({ theme }) => theme.palette.background.paper};
    overflow: hidden;
`;

export const ImageWrapper = styled.div`
    max-height: 175px;
    min-height: 175px;
    overflow: hidden;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const DetailWrapper = styled.div`
    padding: 15px;
    min-height: 35px;
    color: ${({ theme }) => theme.palette.text.primary};
`;

export const Title = styled.p`
    margin: 0;
    font-weight: 300;
    font-size: 16px;
    line-height: 23px;
`;
