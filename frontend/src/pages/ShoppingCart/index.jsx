import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    StyledLabel,
    colors,
} from "../../components/Styles.js";
import NavBar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import { AuthContext } from '../../providers/auth';
import axios from 'axios';
import { ticketList } from '../../data.js';
import { useNavigate } from 'react-router';
import { date } from 'yup';
const Container = styled.div`
    margin-top: 22px;
    display:flex;
    justify-content: center;
    align-items: center;
`

const Content = styled.div`
    margin-top: 22px;
    width: 1200px;
    height: 100%;
    border-radius: 25px;
    background-color: white;
    box-shadow: 0 0 10px ${colors.theme};
    flex-direction: column;
    padding 25px;
`

const Title = styled.p`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin: 5px;
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
    width: 250px;
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
const PContainer = styled.div`
    flex: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`

const CartItems = styled.div`
    margin: 30px auto;
`

const Image = styled.img`
    width: 100px;
    height: auto;
    border: 2px solid black;
    margin-right: 10px;
`

const CartTicketsList = styled.div`
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    margin-left: 5%
`

const CartTicketsInfo = styled.div`
    display: flex;
    width: 450px;
    align-items: center;
    justify-content: center;
`

const CartAddRemove = styled.div`
    width: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CartButtonAdd = styled.button`
    width: 30px;
    margin-right: 15px;
    font-weight: 700;
    border: 3px solid #00a000;
    border-radius: 25px;
    color: #00a000;
    cursor: pointer;

    &:hover{
        background-color: #00a000;
        color: #fff;
    }

`

const CartButtonRemove = styled.button`
    width: 30px;
    margin-right: 15px;
    font-weight: 700;
    border: 3px solid red;
    border-radius: 25px;
    color: red;
    cursor: pointer;

    &:hover{
        background-color: red;
        color: #fff;
    }

`
const TicketInfo = styled.p`
    text-align: center;
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: 20px;
`
const Select = styled.select`
    width: 250px;
    height: 45px;
    padding: 10px;
    padding-left: 50px;
    font-size: 16px;
    letter-spacing: 1px;
    color: #787878;
    background-color: ${colors.light};
    border: 1px solid ${colors.dark};
    border-radius: 25px;
    outline: 0;
    display: block;
    margin: 5px auto 10px auto;
    transition: ease-in-out 0.3s;
`
const Option = styled.option`
    font-size: 14px;
`

function ShoppingCart() {
    const { user, cartList } = React.useContext(AuthContext);
    const [tickets, setTickets] = useState([]);
    const [pagamento, setPagamento] = useState('');

    const navigate = useNavigate();

    const createPurchaseApi = async (formaPagamento, userData) => {
        let resultadoPurchase = false;
        let purchaseId = 0;
        const purchaserUserId = {
            id: userData.id,
        };
        
        await axios.post(`http://localhost:8080/api/v1/purchases`, {
            user: purchaserUserId,
            formaPagamento,
            dataCompra: new Date().toISOString(),
            valorTotal: price,
        }).then((res) => {
            resultadoPurchase = true;
            purchaseId = res.data.id;
        }).catch((err) => {
            console.log(err);
            resultadoPurchase = false;
        });

        if (resultadoPurchase === true) {
            for (let i = 0; i < tickets.length; i++) {
                const ticket = tickets[i];
                const ticketId = ticket.ticket.id;
                const quantidade = ticket.quantidade;

                await createPurchaseTicketApi(purchaseId, ticketId, quantidade)
            }
        }
        

        return resultadoPurchase;
    }; 

    const createPurchaseTicketApi = async (idPurchase, idTicket, quantidade) => {
        let resultado = false;
        
        const pId = {
            id: idPurchase,
        };

        const ticketId = {
            id: idTicket,
        };
        
        console.log(idPurchase);

        await axios.post(`http://localhost:8080/api/v1/purchases/tickets`, {
            purchase: pId,
            ticket: ticketId,
            quantidade,
        }).then((res) => {
            resultado = true;
        }).catch((err) => {
            console.log(err);
            resultado = false;
        });

        return resultado;
    }; 

    let price = 0;

    (() => {
        for (let i = 0; i < tickets.length; i++) {
            const ticket = tickets[i];
            price += (ticket.ticket.preco * ticket.quantidade);  
        }
    })();
    
    const AumentaQuantidade = (ticketId) => {
        for (let i = 0; i < tickets.length; i++) {
            const ticket = tickets[i];
            if (ticket.ticket.id === ticketId) {
                tickets[i].quantidade += 1;
                navigate('/');
                navigate('/shopping-cart');
                break;
            } 
        }
    }

    const DiminuiQuantidade = (ticketId) => {
        for (let i = 0; i < tickets.length; i++) {
            const ticket = tickets[i];
            if (ticket.ticket.id === ticketId) {
                if (tickets[i].quantidade > 1) {
                    tickets[i].quantidade -= 1;
                    navigate('/');
                    navigate('/shopping-cart');
                    break;
                }
                tickets.splice(i, 1);
                navigate('/');
                navigate('/shopping-cart');
                break;
            } 
        }
    }

     function onChange(e){
        const { value } = e.target;

        setPagamento(value);
    }

    async function FinalizarCompra(){
         const resultadoRegistro = await createPurchaseApi(pagamento, user.data);
        
        if(resultadoRegistro){
            navigate('/');
        }
     }

    useEffect(() => {
        setTickets(cartList);
    }, []);
    
    return (
        <div>
            <NavBar/>
            <Container>
                <Content>
                    <Title>CARRINHO</Title>
                    <hr />
                    {tickets.length === 0 && <PContainer>
                        <p>Nenhum ingresso foi adicionado ao carrinho.</p>
                    </PContainer>}
                    <CartItems>
                        {tickets.map((item) => 
                            <CartTicketsList key={item.ticket.id}>
                                <Image src={item.ticket.fotoEvento} alt="" />
                                <CartTicketsInfo><p>{item.ticket.nome}</p></CartTicketsInfo>
                                <CartAddRemove>
                                    <CartButtonAdd
                                        onClick={() => {AumentaQuantidade(item.ticket.id)}}
                                    >+</CartButtonAdd>
                                    <CartButtonRemove
                                        onClick={() => {DiminuiQuantidade(item.ticket.id)}}
                                    >-</CartButtonRemove>
                                </CartAddRemove>
                                <CartTicketsInfo><p>{item.quantidade}</p></CartTicketsInfo>
                                <CartTicketsInfo><p>R$ {item.ticket.preco * item.quantidade}</p></CartTicketsInfo>
                            </CartTicketsList>
                        )}
                        <hr />
                        <TicketInfo>
                            <strong>Preço Total: </strong>
                            R$ {price}
                        </TicketInfo>
                        <TicketInfo>
                            Escolha a forma de pagamento
                        </TicketInfo>
                        <Select name="formaPagamento" onChange={ onChange }>
                            <Option value="" defaultValue>Pagamento</Option>
                            <Option value="Cartão de Crédito">Cartão de Crédito</Option>
                            <Option value="Boleto">Boleto</Option>
                            <Option value="PIX">PIX</Option>
                            <Option value="Bitcoin">Bitcoin</Option>
                        </Select>
                        <ButtonContainer>
                            <BuyButton
                                onClick={FinalizarCompra}
                                type="submit">Finalizar compra</BuyButton>
                        </ButtonContainer>
                    </CartItems>
                    
                </Content>
            </Container>
            <Footer/>
        </div>
    )
}

export default ShoppingCart
