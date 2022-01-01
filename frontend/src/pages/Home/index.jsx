import React, { useCallback, useEffect, useState } from "react";
import { Filter } from "../../components/Filter/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import TicketDetails from "../../components/TicketDetails/index.jsx";
import { LoadMoreButton } from "../../components/LoadMoreButton/index.jsx";
import NavBar from "../../components/Navbar/index.jsx";
import Tickets from "../../components/Tickets/index.jsx";
import axios from "axios";
import styled from "styled-components";

const PContainer = styled.div`
    flex: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`

const Home = () => {
    const [tickets, setTickets] = useState([]);
    const [allTickets, setAllTickets] = useState([]);
    const [page, setPage] = useState(0);
    const [ticketsPerPage] = useState(4);
    const [searchValue, setSearchValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [ openModal, setOpenModal ] = useState(false);
    const [ticketDetail, setTicketDetail] = useState([]);

    const fetchTicketInfo = async () => {
        return axios.get(`http://localhost:8080/api/v1/tickets`)
    };

    useEffect(() => {
        fetchTicketInfo()
            .then(res => {
                setTickets(res.data);
                setAllTickets(res.data);
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
        setTickets(tickets.slice(page, ticketsPerPage));
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
            <NavBar/>
            <div>
                {!openModal && <Filter
                    searchValue={searchValue}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                />}
                {filterIntersection.length > 0 && !openModal &&(
                    <Tickets 
                        tickets={ filterIntersection }
                        openModal={setOpenModal}
                        tDetails={setTicketDetail}
                    />
                )}
                {filterIntersection.length === 0 && (
                    <PContainer>
                        <p>Nenhum ingresso foi encontrado ;-;</p>
                    </PContainer>
                )}
            </div>
            {openModal && <TicketDetails
                details={ticketDetail}
                closeDetailModal={setOpenModal}
                btnName={"Comprar"}
            />}
            {!openModal && <LoadMoreButton onClick={loadMoreTickets} disabled={noMoreTicketsToLoad}/>}
            <Footer/>
        </div>
    );
}

export default Home