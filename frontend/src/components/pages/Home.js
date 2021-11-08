import { StyledTitle, StyledSubTitle, StyledButton, ButtonGroup } from "../Styles";

const Home = () => {
    return (
        <div>
            <div></div>
            <StyledTitle size={ 65 }>
                Olá!
            </StyledTitle>
            <StyledSubTitle size={ 27 }>
                Tela Inicia provisória.
            </StyledSubTitle>
            <ButtonGroup>
                <StyledButton to="/login">Login</StyledButton>
                <StyledButton to="/signup">Cadastro</StyledButton>
            </ButtonGroup>
            
        </div>
    );
}

export default Home