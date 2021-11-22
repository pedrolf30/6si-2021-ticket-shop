import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import EditProfile from '../../components/EditProfile/index.jsx';
import { AuthContext } from '../../providers/auth';

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
    box-shadow: 0 0 10px #000;
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
    const {user} = React.useContext(AuthContext);
    const [ openModal, setOpenModal ] = useState(false);

    return (
        <div>
            <NavBar/>
            <Container>
            {!openModal &&
                <Content>
                    <Title>MEU PERFIL</Title>
                    <Image 
                        src={user.data.fotoPerfil === null 
                        ? "https://api.ejcomp.com.br/members/1586969992913-perfilsemfoto.jpg"
                        : user.data.fotoPerfil}
                    />
                    <ProfileInfo>
                        <strong>Nome: </strong>
                        {user.data.nome}
                    </ProfileInfo>
                    <ProfileInfo>
                        <strong>Email: </strong>
                        {user.data.email}
                    </ProfileInfo>
                    <ProfileInfo>
                        <strong>Contato: </strong>
                        {user.data.telefoneContato}
                    </ProfileInfo>
                    <ProfileInfo>
                        <strong>CPF/CNPJ: </strong>
                        {user.data.cpfCnpj}
                    </ProfileInfo>
                    <ProfileInfo>
                        <strong>Data de Nascimento: </strong>
                        {user.data.dataNascimento}
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
