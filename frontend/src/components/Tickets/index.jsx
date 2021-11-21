import React from 'react'
import styled from 'styled-components'
import TicketCard from '../TicketCard'


const Container = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
`

export const Tickets = ({openModal, tickets = [], tDetails}) => {
    return (
        <Container>
            {tickets.map((item) => (
                <div>
                    <TicketCard details={tDetails} open={() => {openModal(true)}} item={ item } key={ item.idIngresso } />
                </div>
            ))}
        </Container>
    )
}

export default Tickets;
