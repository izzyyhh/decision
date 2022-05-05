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
    font-size: 22px;
    font-weight: 500;
    line-height: 30px;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        font-size: 32px;
        font-weight: 500;
        line-height: 40px;
    }
`;

export const HeadlineH3 = styled.h3`
    ${Headline}
    font-size: 20px;
    font-weight: 400;
    margin-top: 0;
    line-height: 25px;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        font-size: 28px;
        line-height: 35px;
    }
`;
