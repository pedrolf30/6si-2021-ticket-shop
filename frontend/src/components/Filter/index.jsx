import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    justify-content: space-between;
`;

const FilterItem = styled.div`
    margin: 20px;
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 14px;
`
const Input = styled.input`
    padding: 10px;
    margin-right: 20px;
    width: 300px;
    font-size:14px;
    border: 1px solid #000;
    border-radius: 25px;
`

const Select = styled.select`
    padding: 10px;
    border: 1px solid #000;
    border-radius: 25px;
    background-color: #fff;
`

const Option = styled.option`
    font-size: 14px;
`

export const Filter = ({searchValue, handleChange, handleSelectChange}) => {
    return (
        <Container>
            <FilterItem>
                <FilterText>Filtrar por nome: </FilterText>
                <Input
                    placeholder="Digite o nome do evento"
                    onChange={handleChange}
                    value={searchValue}
                    type="search"
                />
            </FilterItem>
            <FilterItem>
                <FilterText>Filtrar por categoria: </FilterText>
                <Select onChange={handleSelectChange}>
                    <Option value="" defaultValue>Categoria</Option>
                    <Option value="Musica">Musica</Option>
                    <Option value="Esporte">Esporte</Option>
                    <Option value="Comédia">Comédia</Option>
                    <Option value="Cinema">Cinema</Option>
                    <Option value="Teatro">Teatro</Option>
                </Select>
            </FilterItem>
        </Container>
    )
}
