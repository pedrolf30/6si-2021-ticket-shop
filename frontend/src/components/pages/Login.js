//styled components
import {
    StyledTextInput,
    StyledFormButton,
    StyledFormsArea,
    StyledLabel,
    StyledTitle,
    colors,
    ButtonGroup,
    ExtraText,
    TextLink,
    CopyrightText,
} from "../Styles";

//formik
import { Formik, Form } from "formik";
import { TextInput } from "../FormLib";
import * as Yup from 'yup';

//icons
import { FiMail, FiLock } from 'react-icons/fi';

//Loader
import Loader from "react-loader-spinner";

//Auth redux
import { connect } from "react-redux";
import { loginUser } from "../../auth/actions/userActions";
import { useNavigate } from 'react-router-dom';

const Login = ({ loginUser }) => {
    const history = useNavigate();

    return (
        <div>
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
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("E-mail inválido").required("Obrigatório"),
                            senha: Yup.string().max(30, "Senha é muito longa").required("Obrigatório"),
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        loginUser(values, history, setFieldError, setSubmitting);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput
                                name="email"
                                type="text"
                                label="E-mail"
                                placeholder="Digite seu e-mail"
                                icon={<FiMail/>}
                            />

                            <TextInput
                                name="senha"
                                type="password"
                                label="Senha"
                                placeholder="Digite sua senha"
                                icon={<FiLock/>}
                            />

                            <ButtonGroup>
                                {!isSubmitting &&
                                (
                                    <StyledFormButton type="submit">
                                        Login
                                    </StyledFormButton>
                                )
                                }

                                {isSubmitting && (
                                    <Loader
                                        type="ThreeDots"
                                        color={colors.theme}
                                        height={49}
                                        width={100}
                                    />
                                )}
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    Ainda não tem cadastro?
                    <TextLink to="/signup"> Se cadastre.</TextLink>
                </ExtraText>
            </StyledFormsArea>
            <CopyrightText>Desenvolvido por Pedro Ferrareso, 2021</CopyrightText>
        </div>
    );
}

export default connect(null, {loginUser})(Login);