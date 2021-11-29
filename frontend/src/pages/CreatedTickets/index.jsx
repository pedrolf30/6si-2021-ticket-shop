import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Filter } from "../../components/Filter/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import NavBar from "../../components/Navbar/index.jsx";
import TicketDetails from "../../components/TicketDetails/index.jsx";
import Tickets from "../../components/Tickets/index.jsx";
import { LoadMoreButton } from "../../components/LoadMoreButton/index.jsx";
import { Link } from 'react-router-dom';
import CreateTicket from '../../components/CreateTicket/index.jsx';
import { AuthContext } from '../../providers/auth.js';
import axios from 'axios';

const Title = styled.p`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin: 5px;
`
const ButtonContainer = styled.div`
    flex: 20%;
    display: flex;
    justify-content: right;
    align-items: center;
    margin-right: 20px;
`

const PContainer = styled.div`
    flex: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`

const CreateTicketButton = styled.button`
    padding: 10px;
    width: 100px;
    background-color: transparent;
    font-size: 12px;
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

function CreatedTickets() {
    const { user } = React.useContext(AuthContext);

    const [tickets, setTickets] = useState([]);
    const [allTickets, setAllTickets] = useState([]);
    const [page, setPage] = useState(0);
    const [ticketsPerPage] = useState(4);
    const [searchValue, setSearchValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [ openDetailModal, setOpenDetailModal ] = useState(false);

    const [ticketDetail, setTicketDetail] = useState([]);

    const fetchUserInfo = async () => {
        return axios.get(`http://localhost:8080/api/v1/tickets/organizers/${user.data.id}`)
    };

    useEffect(() => {
        fetchUserInfo()
            .then(res => {
                setTickets(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const filteredBySearch = !!searchValue
      ? allTickets.filter(ticket => {
        return ticket.nome.toLowerCase().includes(searchValue.toLowerCase());
      })
        : tickets;
    
    const filteredByCategories = !!categoryValue
      ? allTickets.filter(ticket => {
        return ticket.categoria.toLowerCase().includes(categoryValue.toLowerCase());
      })
        : tickets;
    
    let filterIntersection = filteredBySearch.filter(x => filteredByCategories.includes(x));    

    if (searchValue !== '' && categoryValue === '') {
        filterIntersection = filteredBySearch;
    }
    else if (searchValue === '' && categoryValue !== '') {
        filterIntersection = filteredByCategories;
    }
    else if (searchValue !== '' && categoryValue !== '') {
         filterIntersection = filteredBySearch.filter(x => filteredByCategories.includes(x));
    }
    else if (searchValue === '' && categoryValue === '') {
         filterIntersection = tickets
    }

    const handleLoadTickets = useCallback(async (page, ticketsPerPage) => {
        const tks = tickets;

        setTickets(tks.slice(page, ticketsPerPage));
        setAllTickets(tks);
    }, [])

    const loadMoreTickets = async () => {
        const nextPage = page + ticketsPerPage;
        const nextTickets = allTickets.slice(nextPage, (nextPage + ticketsPerPage));
        tickets.push(...nextTickets);

        setTickets(tickets);
        setPage(nextPage);
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchValue(value);
    }

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setCategoryValue(value);
    }

    useEffect(() => {
        handleLoadTickets(0, ticketsPerPage);
    }, [handleLoadTickets, ticketsPerPage]);


    const noMoreTicketsToLoad = page + ticketsPerPage >= allTickets.length;
    return (
        <div>
            <NavBar />
            {(!openCreateModal && !openDetailModal) && (
                <Title>MEUS INGRESSOS CADASTRADOS</Title>
            )} 
            <div>
                {(!openCreateModal && !openDetailModal) &&
                    <>
                    <ButtonContainer>
                        <CreateTicketButton onClick={() => {setOpenCreateModal(true)}}>Cadastrar Ingresso</CreateTicketButton>
                    </ButtonContainer>
                    <Filter
                        searchValue={searchValue}
                        handleChange={handleChange}
                        handleSelectChange={handleSelectChange}
                    />
                    </>
                }
                {filterIntersection.length > 0 && (!openCreateModal && !openDetailModal) &&(
                    <Tickets 
                        tickets={ filterIntersection }
                        openModal={setOpenDetailModal}
                        tDetails={setTicketDetail}
                    />
                )}
                {filterIntersection.length === 0 && (!openCreateModal && !openDetailModal) &&(
                    <PContainer>
                        <p>Você não cadastrou nenhum ingresso ;-;</p>
                    </PContainer>    
                )}
            </div>
            {openCreateModal && <CreateTicket closeModal={setOpenCreateModal} />}
            {openDetailModal && <TicketDetails
                details={ticketDetail}
                closeModal={setOpenDetailModal}
                btnName={ "Editar" }
            />}
            {(!openCreateModal && !openDetailModal) && <LoadMoreButton onClick={loadMoreTickets} disabled={noMoreTicketsToLoad} />}
            
            <Footer />
        </div>
    )
}

export default CreatedTickets
