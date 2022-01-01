import React from 'react'
import styled from 'styled-components'
import { format, parseISO } from 'date-fns';
import { AuthContext } from '../../providers/auth';
import { useNavigate } from 'react-router';
import { colors } from '../Styles';
import axios from 'axios';

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
    box-shadow: 0 0 10px ${colors.theme};
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

const Btn1 = styled.button`
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

const Btn2 = styled.button`
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

export const TicketDetails = ({ details, closeDetailModal }) => {

    const navigate = useNavigate();


    const fechaModal = () => {
        navigate('/');
    }

    return (
        <ModalBackground>
            <Container>
                <TicketContent>
                    <ExitButtonContainer>
                        <ExitButton onClick={() => {fechaModal()}}> X </ExitButton>
                    </ExitButtonContainer>
                    <Image src={details.ticket.fotoEvento}/>
                    <Title>{details.ticket.nome}</Title>
                    <br/>
                    <TicketInfo>
                        <strong>Organizador: </strong>
                        {details.ticket.organizer.nome}
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Data: </strong>
                        {format(parseISO(details.ticket.data), 'dd/MM/yyyy')} 
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Horário: </strong>
                        {details.ticket.horario}
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Endereço: </strong>
                        {details.ticket.endereco}
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Descrição: </strong>
                        {details.ticket.descricao}
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Preço: </strong>
                        {details.ticket.preco}
                    </TicketInfo>
                    <hr />
                    <TicketInfo>
                        <strong>Forma de pagamento: </strong>
                        {details.purchase.formaPagamento}
                    </TicketInfo>
                    <TicketInfo>
                        <strong>Data da compra: </strong>
                        {format(parseISO(details.purchase.dataCompra), 'dd/MM/yyyy')} 
                    </TicketInfo>
                     <TicketInfo>
                        <strong>Quantidade: </strong>
                        {details.quantidade}
                    </TicketInfo>
                    <ButtonContainer>
                        <Btn2 onClick={() => {fechaModal()}}>Cancelar</Btn2>
                    </ButtonContainer>
                </TicketContent>
            </Container>
        </ModalBackground>

    )
}

export default TicketDetails;
 