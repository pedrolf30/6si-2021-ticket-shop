//styled components
import {
    StyledTitle,
    ButtonGroup,
    StyledLabel,
    colors,
} from "../Styles";
import styled from 'styled-components'
import React, { useState } from "react";
import axios from "axios";

//formik
import { Formik, Form } from "formik";
import { TextInput } from "../FormLib";

//icons
import { FiMail, FiLock, FiUser, FiCalendar, FiPhone, FiCamera, FiWatch, FiMapPin, FiDollarSign, FiType, FiTrello, FiPercent } from 'react-icons/fi';
import {HiOutlineIdentification} from 'react-icons/hi'
import { format, parseISO } from 'date-fns';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../providers/auth";

export const StyledContainer = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.light}
`;

export const StyledFormsArea = styled.div`
    margin-top: 25px;
    background-color: white;
    text-align: center;
    padding: 45px 55px;
    border-radius: 25px;
    box-shadow: 0px 0px 8px 1px ${colors.theme};
`;

const Select = styled.select`
    width: 280px;
    padding: 15px;
    padding-left: 50px;
    font-size: 17px;
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
const SaveButton = styled.button`
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

const CreateTicket = ({ closeModal }) => {
    const initialState = {
        nome: "",
        data: "",
        horario: "",
        endereco: "",
        preco: "",
        descricao: "",
        qtdIngressos: "",
        status: "",
        porcentagemDesconto: "",
        fotoEvento: "",
        categoria: "",
    };

    const { user } = React.useContext(AuthContext);

    const [values, setValues] = useState(initialState);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const createApi = async (values, userData) => {
        console.log(values);
        console.log(userData.id);
        let resultado = false;
        
        const organizerIdJson = {
            id: userData.id,
        };

        let { nome, data, horario, endereco, preco, descricao, qtdIngressos,
                porcentagemDesconto, fotoEvento, categoria } = values;
        

        await axios.post(`http://localhost:8080/api/v1/tickets`, {
            organizer: organizerIdJson,
            nome,
            data,
            horario,
            endereco,
            preco,
            descricao,
            qtdIngressos,
            status: 'Venda',
            porcentagemDesconto,
            fotoEvento: fotoEvento !== '' ? fotoEvento : "https://django-metabuscador.s3.amazonaws.com/static/home/images/no-photo.png",
            categoria,
        }).then((res) => {
            resultado = true;
        }).catch((err) => {
            console.log(err);
            resultado = false;
        });

        return resultado;
    }; 

    function onChange(e){
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    }

     async function onSubmit(e){
        e.preventDefault();
         const resultadoRegistro = await createApi(values, user.data);
        
        if(resultadoRegistro){
            navigate('/');
            navigate('/created-tickets');
        }

        setError(true);
        setValues(initialState);
     }

    return (
        <StyledContainer>
            <StyledFormsArea>
                <ExitButtonContainer>
                    <ExitButton onClick={() => {closeModal(false)}}> X </ExitButton>
                </ExitButtonContainer>
                <StyledTitle
                    color="#000"
                    size={30}
                >
                    CADASTRAR
                </StyledTitle>
                <Formik>
                    <Form onSubmit={ onSubmit }>
                        <TextInput
                            name="nome"
                            type="text"
                            label="Nome"
                            placeholder="Digite o nome"
                            icon={<FiUser />}
                            onChange={onChange}
                            value={values.nome}
                        />
                        <TextInput
                            name="data"
                            type="date"
                            label="Data"
                            placeholder="Insira a data"
                            icon={<FiCalendar />}
                            onChange={onChange}
                            value={values.data}
                        />
                        <TextInput
                            name="horario"
                            type="text"
                            label="Horário"
                            placeholder="Digite o horário"
                            icon={<FiWatch />}
                            onChange={onChange}
                            value={values.horario}
                        />
                        <TextInput
                            name="endereco"
                            type="text"
                            label="Endereço"
                            placeholder="Digite o endereço"
                            icon={<FiMapPin />}
                            onChange={onChange}
                            value={values.endereco}
                        />

                        <TextInput
                            name="preco"
                            type="number"
                            label="Preço"
                            placeholder="Digite o preço"
                            icon={<FiDollarSign />}
                            onChange={onChange}
                            value={values.preco}
                        />
                        <TextInput
                            name="descricao"
                            type="text"
                            label="Descrição"
                            placeholder="Digite a descrição"
                            icon={<FiType />}
                            onChange={onChange}
                            value={values.descricao}
                        />

                        <TextInput
                            name="qtdIngressos"
                            type="number"
                            label="Quantidade"
                            placeholder="Digite a quantidade"
                            icon={<FiTrello />}
                            onChange={onChange}
                            value={values.qtdIngressos}
                        />
                        <TextInput
                            name="porcentagemDesconto"
                            type="text"
                            label="Desconto"
                            placeholder="Digite o desconto em %"
                            icon={<FiPercent />}
                            onChange={onChange}
                            value={values.porcentagemDesconto}
                        />
                        <TextInput
                            name="fotoEvento"
                            type="text"
                            label="Foto do Evento"
                            placeholder="Digite a URL da foto"
                            icon={<FiCamera />}
                            onChange={onChange}
                            value={values.fotoEvento}
                        />
                        <StyledLabel>Categoria</StyledLabel>
                        <Select name="categoria" onChange={ onChange }>
                            <Option value="" defaultValue>Categoria</Option>
                            <Option value="Musica">Musica</Option>
                            <Option value="Esporte">Esporte</Option>
                            <Option value="Comédia">Comédia</Option>
                            <Option value="Cinema">Cinema</Option>
                            <Option value="Teatro">Teatro</Option>
                        </Select>
                        <ButtonGroup>
                            <SaveButton type="submit">
                                Salvar
                            </SaveButton>
                        </ButtonGroup>
                    </Form>
                </Formik>
            </StyledFormsArea>
        </StyledContainer>
    );
}

export default CreateTicket;