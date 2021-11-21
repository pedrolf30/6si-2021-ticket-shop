import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    min-height: 100px;
    display: flex;
    align-items: flex-end;
`

const LoadMore = styled.button`
    width: 100%;
    background-color: transparent;
    border: 3px solid #000;
    border-radius: 25px;
    color: #000;
    padding: 15px 30px;
    cursor: pointer;

    &:disabled{
        background-color: #888;
        cursor: not-allowed;
    }
`

export const LoadMoreButton = ({onClick, disabled}) => {
    return (
        <Container>
            <LoadMore
                onClick={onClick}
                disabled={disabled}
            >Carregar mais</LoadMore>
        </Container>
        
    )
}
