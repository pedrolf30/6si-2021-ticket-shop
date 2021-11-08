//styled components
import {
    StyledFormButton,
    StyledFormsArea,
    StyledTitle,
    colors,
    ButtonGroup,
    ExtraText,
    TextLink,
} from "../Styles";

//formik
import { Formik, Form } from "formik";
import { TextInput } from "../FormLib";
import * as Yup from 'yup';

//icons
import { FiMail, FiLock, FiUser, FiCalendar, FiPhone } from 'react-icons/fi';
import {HiOutlineIdentification} from 'react-icons/hi'

//Loader
import Loader from "react-loader-spinner";

//Auth redux
import { connect } from "react-redux";
import { signupUser } from "../../auth/actions/userActions";
import { useNavigate } from 'react-router-dom';

const Signup = ({ signupUser }) => {
    const history = useNavigate();

    return (
        <div>
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
                        cpfCpnj: "",
                        telefoneContato: "",

                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("E-mail inválido").required("Obrigatório"),
                            telefoneContato: Yup.string().required("Obrigatório"),
                            cpfCpnj: Yup.string().required("Obrigatório"),
                            senha: Yup.string().max(30, "Senha é muito longa").required("Obrigatório"),
                            nome: Yup.string().required("Obrigatório"),
                            dataNascimento: Yup.date().required("Obrigatório"),
                            repetirSenha: Yup.string().required("Obrigatório")
                                .oneOf([Yup.ref("senha")], "As senhas não são iguais."),
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        signupUser(values, history, setFieldError, setSubmitting)
                    }}
                >
                    {({isSubmitting}) => (
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

                            {/* <TextInput
                                name="tipo_usuario"
                                type="text"
                                label="Tipo de usuário"
                                placeholder="Escolha uma opção"
                                icon={<FiLock/>}
                            /> */}


                            <ButtonGroup>
                                {!isSubmitting &&
                                (
                                    <StyledFormButton type="submit">
                                        Cadastrar
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
                    Já tem cadastro?
                    <TextLink to="/login"> Faça o login.</TextLink>
                </ExtraText>
            </StyledFormsArea>
        </div>
    );
}

export default connect(null, {signupUser})(Signup);