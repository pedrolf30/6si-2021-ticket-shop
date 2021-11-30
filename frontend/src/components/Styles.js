import styled from 'styled-components';

//React router dom
import { Link } from 'react-router-dom';
export const colors = {
    light: '#fff',
    theme: "#005eff",
    dark: "#2e2e2e",
    red: "#FF0000",
    black: "#000",
}

//Styled components
export const StyledContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.light}
`;

//Home
export const StyledTitle = styled.h2`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: '${(props) => props.color ? props.color : colors.primary}';
    padding: 5px;
    margin-bottom: 20px;
`;

export const StyledSubTitle = styled.p`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) => props.color ? props.color : colors.primary};
    padding: 5px;
    margin-bottom: 25px;
`;

export const StyledButton = styled(Link)`
    padding: 10px;
    width: 150px;
    background-color: transparent;
    font-size: 16px;
    border: 3px solid ${colors.dark};
    border-radius: 25px;
    color: ${colors.dark};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.theme};
        color: ${colors.theme};
        cursor: pointer;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 25px;
    space-between: 25px
`;

//Input
export const StyledTextInput = styled.input`
    width: 280px;
    padding: 15px;
    padding-left: 50px;
    font-size: 17px;
    letter-spacing: 1px;
    color: ${colors.dark};
    background-color: ${colors.light};
    border: 1px solid ${colors.dark};
    border-radius: 25px;
    outline: 0;
    display: block;
    margin: 5px auto 10px auto;
    transition: ease-in-out 0.3s;

    ${(props) => props.invalid && `background-color: ${colors.theme}; color: ${colors.light};`} 

`;

export const StyledLabel = styled.p`
    text-align: left;
    font-size: 13px;
    font-weight: bold;
`;

export const StyledFormsArea = styled.div`
    background-color: white;
    text-align: center;
    padding: 45px 55px;
    border-radius: 25px;
    box-shadow: 0px 0px 8px 1px ${colors.theme};
`;

export const StyledFormButton = styled.button`
    padding: 10px;
    width: 150px;
    background-color: transparent;
    font-size: 16px;
    font-weight: 700;
    border: 2px solid ${colors.theme};
    border-radius: 25px;
    color: ${colors.theme};
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.theme};
        color: ${colors.light};
        cursor: pointer;
    }
`;

export const ErrorMsg = styled.div`
    font-size: 11px;
    color: ${colors.red};
    margin-bottom: 10px;
    text-align: left;
`;

export const ExtraText = styled.p`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) => (props.color ? props.color : colors.black)};
    padding: 2px;
    margin-top: 10px;
`;

export const TextLink = styled(Link)`
    text-decoration: none;
    color: ${colors.theme};

    &: hover {
        text-decoration: underline;
        font-weight: bold;
    }
`;

//Icons
export const StyledIcon = styled.p`
    color: ${colors.dark};
    position: absolute;
    font-size: 21px;
    top: 35px;

    ${(props) => props.right && `right: 15px; `};
    ${(props) => !props.right && `left: 15px;`}
`;

//Copyright
export const CopyrightText = styled.p`
    padding: 5px;
    margin: 20px;
    text-align: center;
    color: ${colors.dark}
`;