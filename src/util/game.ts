import { find } from 'lodash'
import { Card, Cat, FinishedGameState, PlayingGameState } from '../types/types'
import { allTheSame } from './misc'

const getCatIdFrom =
    (cards: Card[]) =>
    (cardId: Card['id']): Cat['id'] => {
        const maybeCard = find(cards, (card) => card.id === cardId)
        if (!maybeCard) {
            throw new Error('Card not found in deck.')
        }
        return maybeCard.cat.id
    }

/**
 * These are a set of predicates that you can use to make decisions based on game state:
 */

export const isCardFlipped =
    (gameState: PlayingGameState) =>
    ({ id: cardId }: Card) =>
        gameState.flippedCardIds.includes(cardId)

export const isCardSolved =
    (gameState: PlayingGameState) =>
    ({ cat: { id: catId } }: Card) =>
        gameState.foundCatIds.includes(catId)

export const areTwoCardsFlipped = (gameState: PlayingGameState): boolean => gameState.flippedCardIds.length >= 2

export const doFlippedCardsMatch = (gameState: PlayingGameState): boolean => {
    const flippedCatIds = gameState.flippedCardIds.map(getCatIdFrom(gameState.cards))
    const cardsMatch = allTheSame(flippedCatIds)
    return cardsMatch
}

export const isGameComplete = (gameState: PlayingGameState): boolean => gameState.cards.every(isCardSolved(gameState))

/**
 * Below you will find actions that change the game state:
 */

export const flipCardOpen = (gameState: PlayingGameState, cardId: Card['id']): PlayingGameState => ({
    ...gameState,
    flippedCardIds: [...gameState.flippedCardIds, cardId],
})

export const unflipAllCards = (gameState: PlayingGameState): PlayingGameState => ({
    ...gameState,
    flippedCardIds: [],
})

const finishGame = (gameState: PlayingGameState): FinishedGameState => ({
    ...gameState,
    type: 'FinishedGameState',
})

export const removeMatchingCardsAndFinishIfNeeded = (
    prevState: PlayingGameState,
): PlayingGameState | FinishedGameState => {
    const nextState = {
        ...prevState,
        foundCatIds: [...prevState.foundCatIds, getCatIdFrom(prevState.cards)(prevState.flippedCardIds[0])],
        flippedCardIds: [],
    }
    return isGameComplete(nextState) ? finishGame(nextState) : nextState
}
