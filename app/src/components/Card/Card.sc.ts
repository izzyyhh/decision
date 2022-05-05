import styled from "styled-components";

export const CardWrapper = styled.div`
    padding: 10px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.palette.background.paper};
    color: ${({ theme }) => theme.palette.secondary.light};
`;

export const Title = styled.p`
    margin-top: 0;
    margin-bottom: 5px;
    margin-left: 7.5px;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.text.secondary};
`;

export const Wrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
`;
