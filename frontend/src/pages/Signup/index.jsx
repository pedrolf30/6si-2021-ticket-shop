//styled components
import {
    StyledFormButton,
    StyledFormsArea,
    StyledTitle,
    StyledLabel,
    colors,
    ButtonGroup,
    ExtraText,
    TextLink,
    StyledContainer,
} from "../../components/Styles";

//formik
import { Formik, Form } from "formik";
import { TextInput } from "../../components/FormLib";

//icons
import { FiMail, FiLock, FiUser, FiCalendar, FiPhone } from 'react-icons/fi';
import {HiOutlineIdentification} from 'react-icons/hi'

import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import styled from 'styled-components'
import axios from "axios";

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

const initialState = {
    email: "",
    senha: "",
    repetirSenha: "",
    dataNascimento: "",
    nome: "",
    cpfCnpj: "",
    telefoneContato: "",
    role: "",
};

const Signup = () => {
    const [values, setValues] = useState(initialState);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const registerApi = async (values) => {
        let resultado = false;

        let roleJson = {
            "id": 0,
            "role": ''
        }

        if (values.role === '1') {
            roleJson = {
                "id": values.role,
                "role": 'Vendedor'
            };
        }
        else if (values.role === '2') {
            roleJson = {
                id: values.role,
                role: 'Comprador'
            };
        }
        
        let { email, senha, repetirSenha, dataNascimento,
            nome, cpfCnpj, telefoneContato, role } = values;

        if (senha === repetirSenha) {
            await axios.post('http://localhost:8080/api/v1/users', {
                role: roleJson,
                nome,
                cpfCnpj,
                telefoneContato,
                fotoPerfil: "https://api.ejcomp.com.br/members/1586969992913-perfilsemfoto.jpg",
                dataNascimento,
                email,
                senha,
            }).then((res) => {
                resultado = true;
            }).catch((err) => {
                console.log(err);
                resultado = false;
            });
        }
        else {
            resultado = false;
        }
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
        const resultadoRegistro = await registerApi(values);
        
        if(resultadoRegistro){
            navigate('/login');
        }

        setError(true);
        setValues(initialState);
     }
    
    return (
        <StyledContainer>
            <StyledFormsArea>
                <StyledTitle
                    color={colors.theme}
                    size={30}
                >
                    Cadastro
                </StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        senha: "",
                        repetirSenha: "",
                        dataNascimento: "",
                        nome: "",
                        cpfCnpj: "",
                        telefoneContato: "",
                    }}
                >
                    <Form onSubmit={ onSubmit }>
                        <TextInput
                            name="nome"
                            type="text"
                            label="Nome"
                            placeholder="Digite seu nome"
                            icon={<FiUser />}
                            onChange={onChange}
                            value={values.nome}
                        />

                        <TextInput
                            name="email"
                            type="text"
                            label="E-mail"
                            placeholder="Digite seu e-mail"
                            icon={<FiMail />}
                            onChange={onChange}
                            value={values.email}
                        />

                        <TextInput
                            name="telefoneContato"
                            type="text"
                            label="Telefone"
                            placeholder="Digite seu telefone"
                            icon={<FiPhone />}
                            onChange={onChange}
                            value={values.telefoneContato}
                        />

                        <TextInput
                            name="cpfCnpj"
                            type="text"
                            label="CPF ou CNPJ"
                            placeholder="Digite seu CPF/CNPJ"
                            icon={<HiOutlineIdentification/>}
                            onChange={onChange}
                            value={values.cpfCnpj}
                        />

                        <TextInput
                            name="dataNascimento"
                            type="date"
                            label="Data de nascimento"
                            placeholder="Digite sua data de nascimento"
                            icon={<FiCalendar/>}
                            onChange={onChange}
                            value={values.dataNascimento}
                        />
                        <TextInput
                            name="senha"
                            type="password"
                            label="Senha"
                            placeholder="Digite sua senha"
                            icon={<FiLock/>}
                            onChange={onChange}
                            value={values.senha}
                        />

                        <TextInput
                            name="repetirSenha"
                            type="password"
                            label="Confirmação senha"
                            placeholder="Confirme sua senha"
                            icon={<FiLock/>}
                            onChange={onChange}
                            value={values.repetirSenha}
                        />
                        <StyledLabel>Tipo de usuário</StyledLabel>
                        <Select name="role" onChange={ onChange }>
                            <Option defaultValue>Escolha o tipo</Option>
                            <Option value="1">Vendedor</Option>
                            <Option value="2">Comprador</Option>
                        </Select>
                        <ButtonGroup>
                            <StyledFormButton type="submit">
                                Cadastrar
                            </StyledFormButton>
                        </ButtonGroup>
                    </Form>
                </Formik>
                <ExtraText>
                    Já tem cadastro?
                    <TextLink to="/login"> Faça o login.</TextLink>
                </ExtraText>
            </StyledFormsArea>
        </StyledContainer>
    );
}

export default Signup;