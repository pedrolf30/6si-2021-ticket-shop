import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../Styles';
import { format, parseISO } from 'date-fns';

const Container = styled.div`
    background: #fff;
    box-shadow: 0 0 10px ${colors.theme};
    transition: transform 100ms ease-in-out;
    
    &:hover{
       transform: scale(1.05);
    }
`

const TicketContent = styled.div`
    padding: 30px;
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

const SeeMoreButton = styled(Link)`
    padding: 10px;
    width: 150px;
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
`;
export const TicketCard = ({item, open, details}) => {
    return (
        <Container>
            <TicketContent>
                <Image src={item.fotoEvento} />
                <Title>{item.nome}</Title>
                <TicketInfo>{format(parseISO(item.data), 'dd/MM/yyyy')} - {item.horario}</TicketInfo>
                <TicketInfo><strong>R${item.preco}</strong></TicketInfo>
                <ButtonContainer>
                    <SeeMoreButton to="" onClick={() => {open(); details(item)}}>Ver mais</SeeMoreButton>
                </ButtonContainer>
                
            </TicketContent>
        </Container>
    )
}

export default TicketCard;
