import styled from "styled-components";

export const Wrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.palette.background.paper};
    color: ${({ theme }) => theme.palette.secondary.light};
`;

export const Title = styled.p`
    margin: 0;
    font-size: 30px;
    font-weight: 400;
`;
