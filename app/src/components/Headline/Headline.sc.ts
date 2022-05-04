import styled, { css } from "styled-components";

const Headline = css`
    line-height: 48px;
    font-style: normal;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.palette.text.primary};
    margin: 0;
`;

export const HeadlineH2 = styled.h2`
    ${Headline}
    font-size: 30px;
    font-weight: 500;
    line-height: 35px;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        font-size: 30px;
        font-weight: 600;
        line-height: 48px;
    }
`;

export const HeadlineH3 = styled.h3`
    ${Headline}
    font-size: 36px;
    font-weight: 400;
`;
