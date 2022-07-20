import { Card, PlayingGameState } from '../types/types'
import { areTwoCardsFlipped, isCardFlipped, isCardSolved, isMultiplayerGame } from '../util/game'
import { NOOP } from '../util/misc'

import { GameAction } from '../hooks/useGameState'

import { CardGrid, CardSlot } from './CardGrid'
import { CatCard } from './CatCard'
import { Layer, Layers, StatusTab } from '../ui/layers'

const noopHandler = () => () => NOOP

type PlayingProps = {
    gameState: PlayingGameState
    dispatchGameAction: React.Dispatch<GameAction>
}

export const Playing = ({ gameState, dispatchGameAction }: PlayingProps) => {
    const { board, cards } = gameState
    // no need to use useCallback here, since renders will be triggered by
    // gameState changes, which would be the only dep
    const showCurrentPlayer = isMultiplayerGame(gameState)
    const isFlipped = isCardFlipped(gameState)
    const isSolved = isCardSolved(gameState)
    const flipCardHandler = (cardId: Card['id']) => () => dispatchGameAction({ type: 'FlipCardAsyncAction', cardId })
    // once to cards were flipped, no user interaction is needed, we're
    // waiting for the game to flip them back or remove them
    const cardClickHandler = areTwoCardsFlipped(gameState) ? noopHandler : flipCardHandler
    return (
        <Layers>
            <Layer>
                <CardGrid gridSize={board.gridSize}>
                    {cards.map((card) => (
                        <CardSlot key={card.id}>
                            {!isSolved(card) && (
                                <CatCard
                                    facedDown={!isFlipped(card)}
                                    cat={card.cat}
                                    onClick={isFlipped(card) ? NOOP : cardClickHandler(card.id)}
                                />
                            )}
                        </CardSlot>
                    ))}
                </CardGrid>
            </Layer>
            {showCurrentPlayer && <StatusTab>{gameState.players[gameState.currentPlayer]} is playing.</StatusTab>}
        </Layers>
    )
}
