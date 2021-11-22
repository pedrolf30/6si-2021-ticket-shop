//styled components
import {
    StyledFormButton,
    StyledFormsArea,
    StyledTitle,
    colors,
    ButtonGroup,
    ExtraText,
    TextLink,
    StyledContainer,
} from "../../components/Styles";
import styled from 'styled-components'

//formik
import { Formik, Form } from "formik";
import { TextInput } from "../../components/FormLib";
import * as Yup from 'yup';

//icons
import { FiMail, FiLock, FiUser, FiCalendar, FiPhone, FiCamera } from 'react-icons/fi';
import {HiOutlineIdentification} from 'react-icons/hi'

//Loader
import Loader from "react-loader-spinner";

import { useNavigate } from 'react-router-dom';

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
const EditProfile = ({userData,closeModal}) => {
    const history = useNavigate();

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
                    EDITAR PERFIL
                </StyledTitle>
                <Formik
                    initialValues={{
                        email: userData.email,
                        senha: "",
                        repetirSenha: "",
                        dataNascimento: userData.dataNascimento,
                        nome: userData.nome,
                        cpfCpnj: userData.cpfCnpj,
                        telefoneContato: userData.telefoneContato,
                    }}
                >
                    <Form>
                        <TextInput
                            name="nome"
                            type="text"
                            label="Nome"
                            placeholder="Digite seu nome"
                            icon={<FiUser/>}
                        />

                        <TextInput
                            name="email"
                            type="text"
                            label="E-mail"
                            placeholder="Digite seu e-mail"
                            icon={<FiMail/>}
                        />

                        <TextInput
                            name="telefoneContato"
                            type="text"
                            label="Telefone"
                            placeholder="Digite seu telefone"
                            icon={<FiPhone/>}
                        />

                        <TextInput
                            name="cpfCpnj"
                            type="text"
                            label="CPF ou CNPJ"
                            placeholder="Digite seu CPF/CNPJ"
                            icon={<HiOutlineIdentification/>}
                        />

                        <TextInput
                            name="dataNascimento"
                            type="date"
                            label="Data de nascimento"
                            placeholder="Digite sua data de nascimento"
                            icon={<FiCalendar/>}
                        />
                        <TextInput
                            name="senha"
                            type="password"
                            label="Senha"
                            placeholder="Digite sua senha"
                            icon={<FiLock/>}
                        />

                        <TextInput
                            name="repetirSenha"
                            type="password"
                            label="Confirmação senha"
                            placeholder="Confirme sua senha"
                            icon={<FiLock/>}
                        />

                        <TextInput
                            name="foto_perfil"
                            type="text"
                            label="Foto de Perfil"
                            placeholder="Insira a URL da foto"
                            icon={<FiCamera/>}
                        />
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

export default EditProfile;