import styled from "styled-components";

export const Title = styled.h3`
    font-family: Roboto;
    font-size: 22px;
`;

export const OptionList = styled.ul`
    margin-top: -0.3em;
    list-style: none;
    color: grey;
`;

export const OptionItem = styled.li`
    font-family: Roboto;
    margin-bottom: 10px;
    font-size: 22px;

    &:last-of-type {
        margin-bottom: 0;
    }
`;

export const VoteContainer = styled.div``;

export const Proposal = styled.p`
    font-family: Roboto;
`;

export const Winner = styled.p`
    font-family: Roboto;
    font-size: 1.5rem;
`;
