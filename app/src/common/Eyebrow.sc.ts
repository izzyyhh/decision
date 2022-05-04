import styled from "styled-components";

export const Eyebrow = styled.p`
    font-weight: 300;
    font-size: 15px;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.text.secondary};
    margin: 0;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        font-size: 22px;
        line-height: 30px;
    }
`;
