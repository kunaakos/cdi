import { useCallback, useEffect, useRef, useState } from 'react'
import { clamp, debounce, range } from 'lodash'

import { MAX_CARDS_IN_ONE_ROW, MIN_CARDS_IN_ONE_ROW } from '../util/config'
import { calculateGridSize, getViewportSize } from '../util/layout'
import { roundDownToEven } from '../util/misc'
import { GettingStartedGameState, GridSize } from '../types/types'

import { GameAction } from '../hooks/useGameState'

import { BlankCard } from './BlankCard'
import { CardGrid, CardSlot } from './CardGrid'
import { Container } from '../ui/Container'
import { Layer, Layers, Overlay } from '../ui/layers'

type GettingStartedProps = {
    gameState: GettingStartedGameState
    dispatchGameAction: React.Dispatch<GameAction>
}
/**
 * NOTE: yeah, this one could use a refactor :D
 */

export const GettingStarted = ({ gameState, dispatchGameAction }: GettingStartedProps) => {
    const [gridSize, setGridSize] = useState<GridSize>(calculateGridSize(getViewportSize()))
    const [cardCountOffset, setCardCountOffset] = useState<number>(0)

    // this callback is used to recalculate grid size after a window resize
    const recalculateGridSize = useCallback(
        // lodash.debounce was used so we don't trigger waaay to many rerenders,
        // and we'll stop recalculating once the game started loading
        gameState.loading
            ? () => {}
            : debounce(() => setGridSize(calculateGridSize(getViewportSize(), cardCountOffset)), 100),
        [cardCountOffset, gameState.loading],
    )
    // this will be called from a window resize event handler, so to make sure the latest
    // instance with up-to-date values is called, store that in a ref...
    const recalculateGridSizeRef = useRef(() => {})
    useEffect(() => {
        recalculateGridSizeRef.current = recalculateGridSize
    }, [recalculateGridSize])

    // .. and call the function stored in the ref from the handler
    useEffect(() => {
        const handleResize = () => recalculateGridSizeRef.current()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const adjustCardCountOffset = useCallback(
        (amount: number) => () => {
            const offsetLimit = MAX_CARDS_IN_ONE_ROW - MIN_CARDS_IN_ONE_ROW
            const newOffset = clamp(cardCountOffset + amount, -1 * offsetLimit, offsetLimit)
            if (newOffset === cardCountOffset) return
            setCardCountOffset(newOffset)
            setGridSize(calculateGridSize(getViewportSize(), newOffset))
        },
        [cardCountOffset],
    )

    const goClickHandler = () => {
        dispatchGameAction({
            type: 'GenerateCardsAsyncAction',
            board: {
                type: 'Board',
                gridSize,
            },
        })
    }

    return (
        <Layers>
            <Layer>
                <CardGrid gridSize={gridSize}>
                    {range(roundDownToEven(gridSize.cols * gridSize.rows)).map((key) => (
                        <CardSlot key={key}>
                            <BlankCard />
                        </CardSlot>
                    ))}
                </CardGrid>
            </Layer>
            {!gameState.loading && (
                <Layer>
                    <Container>
                        <h1>Hi!</h1>
                        <p>Resize (or zoom) this page to change card layout.</p>
                        <p>
                            You can also ask for{' '}
                            <a href="#" onClick={adjustCardCountOffset(+1)}>
                                more
                            </a>{' '}
                            or{' '}
                            <a href="#" onClick={adjustCardCountOffset(-1)}>
                                less
                            </a>{' '}
                            cards without changing the size of the page.
                        </p>
                        <p>
                            If you're happy with the card layout,{' '}
                            <a href="#" onClick={goClickHandler}>
                                start matching cats
                            </a>
                            !
                        </p>
                    </Container>
                </Layer>
            )}
            {gameState.loading && (
                <Overlay>
                    <p>Please be patient while we gather all the cats...</p>
                </Overlay>
            )}
        </Layers>
    )
}
