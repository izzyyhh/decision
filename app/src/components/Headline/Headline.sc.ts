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
    font-size: 36px;
    font-weight: 600;
`;

export const HeadlineH3 = styled.h3`
    ${Headline}
    font-size: 36px;
    font-weight: 400;
`;
