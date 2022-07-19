import styled from '@emotion/styled/macro'

import { Cat } from '../types/types'
import { CARD_GAP, COLORS } from '../util/config'

const CatCardFront = styled.img`
    background: ${COLORS.bgLighter};

    backface-visibility: hidden;
    border-radius: 10px;

    width: 100%;
    height: 100%;

    display: block;
    object-fit: cover;

    transition: 500ms transform;
`

const CatCardBack = styled.div`
    background: ${COLORS.bg};

    backface-visibility: hidden;
    border-radius: 10px;

    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;

    transition: 500ms transform;
`

const CatCardContainer = styled.div`
    perspective: 1000px;

    transform-style: preserve-3d;
    position: relative;

    width: calc(100% - ${CARD_GAP}px);
    height: calc(100% - ${CARD_GAP}px);
    margin: ${CARD_GAP / 2}px;

    &.faced-down ${CatCardFront} {
        transform: rotateY(180deg);
    }
    &.faced-down ${CatCardBack} {
        transform: rotateY(0);
    }

    &.faced-up ${CatCardFront} {
        transform: rotateY(0deg);
    }
    &.faced-up ${CatCardBack} {
        transform: rotateY(-180deg);
    }
`

type CatCardProps = {
    cat: Cat
    facedDown: boolean
    onClick: () => void
}

export const CatCard = ({ facedDown, cat, onClick: clickHandler }: CatCardProps) => {
    return (
        <CatCardContainer className={facedDown ? 'faced-down' : 'faced-up'} onClick={clickHandler}>
            <CatCardFront src={cat.imageUrl} />
            <CatCardBack />
        </CatCardContainer>
    )
}
