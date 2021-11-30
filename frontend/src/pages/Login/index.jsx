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
    ErrorMsg,
} from "../../components/Styles";

//formik
import { Formik, Form } from "formik";
import { TextInput } from "../../components/FormLib";

//icons
import { FiMail, FiLock } from 'react-icons/fi';

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { AuthContext } from '../../providers/auth';


const initialState = {
    email: '',
    senha: '',
};


const Login = () => {
    const { user, setUser } = React.useContext(AuthContext);

    const navigate = useNavigate();

    const [values, setValues] = useState(initialState);
    const [error, setError] = useState(false);

    const loginApi = async (email, senha) => {
        let resultado = false;
        await axios.post('http://localhost:8080/api/v1/login', {
            email,
            senha,
        }).then((res) => {
            setUser(res);
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
        const resultadoLogin = await loginApi(values.email, values.senha);
        
        if (resultadoLogin) {
            navigate('/');
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
                    Login
                </StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        senha: "",
                    }}
                >
                    <Form onSubmit={onSubmit}>
                        <TextInput
                            name="email"
                            type="text"
                            label="E-mail"
                            placeholder="Digite seu e-mail"
                            icon={<FiMail/>}
                            onChange={onChange}
                            value={values.email}
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
                        {error && 
                            <ErrorMsg>
                                Email ou senha incorretos!
                            </ErrorMsg>
                        }
                        <ButtonGroup>
                                <StyledFormButton 
                                    type="submit"
                                >
                                    Login
                                </StyledFormButton>
                        </ButtonGroup>
                    </Form>
                </Formik>
                <ExtraText>
                    Ainda não tem cadastro?
                    <TextLink to="/signup"> Se cadastre.</TextLink>
                </ExtraText>
            </StyledFormsArea>
        </StyledContainer>
    );
}

export default Login;