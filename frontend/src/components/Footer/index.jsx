import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../Styles';

const Container = styled.footer`
    padding-top: 15px;
    padding-bottom: 15px;
    background-color:${colors.theme};
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #000;
    margin-top: -37px;
    height: 60px;
    border-top: 2px solid #000;
    margin-top: 25px;
`

const CopyrightText = styled.p`
    font-size: 14px;
    color: #fff;
`

const AuthorRedirect = styled.a`
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    color: #fff;
    text-decoration: none;
    margin-left: 5px;
`

const Footer = () => {
    return (
        <Container>
            <CopyrightText>
                Projeto Integrador do  6º Semestre Sistema de Informação - UNASP HT, 2021.<br/>
                Feito por: 
                <AuthorRedirect href="https://github.com/pedrolf30">Pedro Ferrareso</AuthorRedirect> e
                <AuthorRedirect href="https://github.com/SamuelPaimAraujoCezar">Samuel Cezar</AuthorRedirect>
            </CopyrightText>
            
       </Container>
    );
}

export default Footer