import styled from '@emotion/styled/macro'
import useElementSize from '../hooks/useElementSize'
import { GridSize, RectangleSize } from '../types/types'
import { CARD_GAP } from '../util/config'
import { fitGridIntoWrapper } from '../util/layout'

export const CardSlot = styled.div``

const CardGridWrapper = styled.div`
    margin: ${CARD_GAP}px;
    width: calc(100% - ${CARD_GAP * 2}px);
    height: calc(100% - ${CARD_GAP * 2}px);
    display: flex;
    justify-content: center;
    align-items: center;
`

type CardGridContainerProps = {
    gridSize: GridSize
    containerSize: RectangleSize
}

const CardGridContainer = styled.div<CardGridContainerProps>`
    display: flex;
    flex-wrap: wrap;
    /* NOTE: width and height are set using inline styles*/
    ${CardSlot} {
        width: ${({ containerSize, gridSize }) => Math.floor(containerSize.width / gridSize.cols - 1)}px;
        height: ${({ containerSize, gridSize }) => Math.floor(containerSize.height / gridSize.rows - 1)}px;
    }
`

type CardGridProps = { gridSize: GridSize; children: React.ReactNode }

export const CardGrid = ({ children, gridSize }: CardGridProps) => {
    const [wrapperRef, { width, height }] = useElementSize()
    const cardGridContainerSize = fitGridIntoWrapper(gridSize, { width, height })
    return (
        <CardGridWrapper ref={wrapperRef}>
            <CardGridContainer
                // NOTE: inline styles are faster than emotion,
                style={cardGridContainerSize}
                gridSize={gridSize}
                containerSize={cardGridContainerSize}
            >
                {children}
            </CardGridContainer>
        </CardGridWrapper>
    )
}
