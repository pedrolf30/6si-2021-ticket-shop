import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import EditProfile from '../../components/EditProfile/index.jsx';
import { AuthContext } from '../../providers/auth';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { colors } from '../../components/Styles.js';
const Container = styled.div`
    margin-top: 22px;
    display:flex;
    justify-content: center;
    align-items: center;
`

const Content = styled.div`
    margin-top: 22px;
    width: 500px;
    height: 100%;
    border-radius: 25px;
    background-color: white;
    box-shadow: 0 0 10px ${colors.theme};
    flex-direction: column;
    padding 25px;
`

const Image = styled.img`
    max-width: 100%;
`

const Title = styled.p`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin: 5px;
`
const ProfileInfo = styled.p`
    text-align: center;
    margin-top: 10px;
    margin-bottom: 25px;
`

const ButtonContainer = styled.div`
    flex: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const EditButton = styled.button`
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

function Profile() {
    const { user } = React.useContext(AuthContext);
    const [ openModal, setOpenModal ] = useState(false);
    const [ userInfo, setUserInfo ] = useState({});

    const fetchUserInfo = async () => {
        return axios.get(`http://localhost:8080/api/v1/users/${user.data.id}`)
    };

    useEffect(() => {
        fetchUserInfo()
            .then(res => {
                setUserInfo(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <NavBar/>
            <Container>
            {!openModal &&
                <Content>
                    <Title>MEU PERFIL</Title>
                    <Image 
                        src={userInfo.fotoPerfil}
                    />
                    <ProfileInfo>
                        <strong>Nome: </strong>
                        {userInfo.nome}
                    </ProfileInfo>
                    <ProfileInfo>
                        <strong>Email: </strong>
                        {userInfo.email}
                    </ProfileInfo>
                    <ProfileInfo>
                        <strong>Contato: </strong>
                        {userInfo.telefoneContato}
                    </ProfileInfo>
                    <ProfileInfo>
                        <strong>CPF/CNPJ: </strong>
                        {userInfo.cpfCnpj}
                    </ProfileInfo>
                    <ProfileInfo>
                        <strong>Data de Nascimento: </strong>
                        {format(parseISO(user.data.dataNascimento), 'dd/MM/yyyy')}
                    </ProfileInfo>
                    <ProfileInfo>
                        <strong>Tipo de usuário: </strong>
                        { user.data.role.role }
                    </ProfileInfo>
                    <ButtonContainer>
                        <EditButton onClick={() => {setOpenModal(true)}}>Editar</EditButton>
                    </ButtonContainer>
                </Content>}
                {openModal && <EditProfile userData={user.data} closeModal={setOpenModal}/>}
            </Container>
            <Footer/>
        </div>
    )
}

export default Profile
