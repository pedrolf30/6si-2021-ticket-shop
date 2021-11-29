import React from 'react'
import styled from 'styled-components'
import { format, parseISO } from 'date-fns';
import { AuthContext } from '../../providers/auth';

const ModalBackground = styled.div`
    margin-top: 22px;
    display:flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    width: 500px;
    height: 100%;
    border-radius: 25px;
    background-color: white;
    box-shadow: 0 0 10px #000;
    display: flex;
    flex-direction: column;
    padding 25px;
`
const TicketContent = styled.div`
    padding: 30px;
`
const ExitButtonContainer = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-end;
`
const ExitButton = styled.button`
    background-color:transparent;
    border: 1px solid red;
    border-radius: 25px;
    color: red;
    padding: 5px 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;

    &:hover{
        background-color: red;
        color: #fff;
        cursor: pointer;
    }
`
const Image = styled.img`
    max-width: 100%;
`

const Title = styled.p`
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    margin-top: 5px;
`
const TicketInfo = styled.p`
    text-align: center;
    margin-top: 10px;
    margin-bottom: 25px;
`

const ButtonContainer = styled.div`
    flex: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BuyButton = styled.button`
    padding: 10px;
    margin: 10px;
    width: 150px;
    height: 45px;
    background-color: transparent;
    font-size: 16px;
    font-weight: bold;
    border: 3px solid #00a000;
    border-radius: 25px;
    color: #00a000;
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: #00a000;
        color: #fff;
        cursor: pointer;
    }

`

const CancelButton = styled.button`
    padding: 10px;
    margin: 10px;
    width: 150px;
    height: 45px;
    background-color: transparent;
    font-size: 16px;
    font-weight: bold;
    border: 3px solid red;
    border-radius: 25px;
    color: red;
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: red;
        color: #fff;
        cursor: pointer;
    }
`

export const TicketDetails = ({ details, closeModal, btnName }) => {
    const { user } = React.useContext(AuthContext);
    return (
        <ModalBackground>
            <Container>
                <TicketContent>
                    <ExitButtonContainer>
                        <ExitButton onClick={() => {closeModal(false)}}> X </ExitButton>
                    </ExitButtonContainer>
                    <Image src={details.fotoEvento}/>
                    <Title>{details.nome}</Title>
                    <TicketInfo>
                        <strong>Organizador: </strong>
                        {details.organizer.nome}
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Data: </strong>
                        {format(parseISO(details.data), 'dd/MM/yyyy')} 
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Horário: </strong>
                        {details.horario}
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Endereço: </strong>
                        {details.endereco}
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Descrição: </strong>
                        {details.descricao}
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Preço: </strong>
                        {details.preco}
                    </TicketInfo>
                    <ButtonContainer>
                        <BuyButton>{ btnName }</BuyButton>
                        <CancelButton onClick={() => { closeModal(false) }} >Cancelar</CancelButton>
                    </ButtonContainer>
                </TicketContent>
            </Container>
        </ModalBackground>

    )
}

export default TicketDetails;
 