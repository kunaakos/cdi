import { Reducer } from 'react'
import { AsyncActionHandlers, useReducerAsync } from 'use-reducer-async'

import { Board, Card, GameState, Id, Player } from '../types/types'
import {
    areTwoCardsFlipped,
    doFlippedCardsMatch,
    flipCardOpen,
    removeMatchingCards,
    selectNextPlayerorFinishGame,
    unflipAllCards,
} from '../util/game'
import { generateCards } from '../util/generators'
import { numberOfCardsThatFit, wait } from '../util/misc'

const FLIPBACK_TIMEOUT = 1000

const INITIAL_GAME_STATE: GameState = {
    type: 'GettingStartedGameState',
    loading: false,
}

export type GameAction = SyncGameAction | AsyncGameAction

type SyncGameAction =
    | {
          type: 'StartGameAction'
          board: Board
          cards: Card[]
          players: Player[]
      }
    | {
          type: 'SetGameStateAction'
          state: GameState
      }
    | {
          type: 'RestartGameAction'
      }

type AsyncGameAction =
    | {
          type: 'GenerateCardsAsyncAction'
          board: Board
          players: Player[]
      }
    | {
          type: 'FlipCardAsyncAction'
          cardId: Id
      }

const gameStateReducer = (gameState: GameState, gameAction: SyncGameAction): GameState => {
    switch (gameAction.type) {
        case 'StartGameAction':
            return {
                type: 'PlayingGameState',
                board: gameAction.board,
                cards: gameAction.cards,
                flippedCardIds: [],
                foundCatIds: [],
                players: gameAction.players,
                matchCount: gameAction.players.map((_) => 0),
                currentPlayer: 0,
            }
        case 'SetGameStateAction':
            // TODO: wouldn't it be nice to validate here
            return gameAction.state

        case 'RestartGameAction':
            return {
                type: 'GettingStartedGameState',
                loading: false,
            }

        default:
            throw new Error('Invalid game state.')
    }
}

const asyncGameActionHandlers: AsyncActionHandlers<Reducer<GameState, SyncGameAction>, AsyncGameAction> = {
    GenerateCardsAsyncAction:
        ({ dispatch }) =>
        async (gameAction) => {
            try {
                // fetching cats for the cards can take a while, let the user know!
                dispatch({
                    type: 'SetGameStateAction',
                    state: {
                        type: 'GettingStartedGameState',
                        loading: true,
                    },
                })
                dispatch({
                    type: 'StartGameAction',
                    board: gameAction.board,
                    cards: await generateCards(numberOfCardsThatFit(gameAction.board.gridSize)),
                    players: gameAction.players,
                })
            } catch (error) {
                // TODO: check how use-reducer-async handles errors and integrate with app error handling
                dispatch({
                    type: 'SetGameStateAction',
                    state: {
                        type: 'ErroredGameState',
                    },
                })
            }
        },
    FlipCardAsyncAction:
        ({ dispatch, getState }) =>
        async (gameAction) => {
            const prevState = getState()

            // check if the action is valid
            if (prevState.type !== 'PlayingGameState' || areTwoCardsFlipped(prevState)) return

            // store and set the state with the next card flipped open, this could be needed by async actions
            const nextState = flipCardOpen(prevState, gameAction.cardId)
            dispatch({
                type: 'SetGameStateAction',
                state: nextState,
            })

            // do nothing more if there's only one card flipped over
            if (!areTwoCardsFlipped(nextState)) return

            // otherwise give the user enough time to see the two cards that are flipped...
            await wait(FLIPBACK_TIMEOUT)

            // ...and check if there was a match?
            if (doFlippedCardsMatch(nextState)) {
                // YES! add the cat id to the list of cats that were already found
                dispatch({
                    type: 'SetGameStateAction',
                    state: selectNextPlayerorFinishGame(removeMatchingCards(nextState)),
                })
            } else {
                // NO :( remember to flip cards back
                dispatch({
                    type: 'SetGameStateAction',
                    state: selectNextPlayerorFinishGame(unflipAllCards(nextState)),
                })
            }
        },
}

export const useGameState = () => {
    const [gameState, dispatchGameAction] = useReducerAsync(
        gameStateReducer,
        INITIAL_GAME_STATE,
        asyncGameActionHandlers,
    )

    return {
        gameState,
        dispatchGameAction,
    }
}
