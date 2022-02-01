import styled from "styled-components";

interface IProps {
    primary: boolean | undefined;
}

export const LinkButtonContainer = styled.button<IProps>`
    background-color: ${props => (props.primary ? ({ theme }) => theme.palette.primary.main : ({ theme }) => theme.palette.primary.main  )};
    font-size: 1rem;
    padding: 12px 15px;
    border-radius: 4px;
    width: 80%;
    box-shadow: 0 8px 8px -4px ${({ theme }) => theme.palette.primary.light};
    border: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    > div a {
        text-decoration: none;
        color: ${({ theme }) => theme.palette.getContrastText(theme.palette.primary.main)};
        padding: 0px 25px;
    }
`;
