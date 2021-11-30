import React from 'react'
import styled from 'styled-components'
import { colors } from '../Styles'

const Container = styled.div`
    min-height: 100px;
    display: flex;
    align-items: flex-end;
`

const LoadMore = styled.button`
    width: 100%;
    background-color: white;
    border: 3px solid ${colors.theme};
    border-radius: 25px;
    color: ${colors.theme};
    padding: 15px 30px;
    cursor: pointer;

    &:disabled{
        background-color: #888;
        cursor: not-allowed;
        border: 3px solid #000;
        color:#000;

    }

    &:hover:enabled{
        background-color: ${colors.theme};
        color: #fff;
        cursor: pointer;
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
