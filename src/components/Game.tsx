import { useGameState } from '../hooks/useGameState'

import { GettingStarted } from './GettingStarted'
import { Playing } from './Playing'
import { Finished } from './Finished'
import { Errored } from './Errored'

export const Game = () => {
    const { gameState, dispatchGameAction } = useGameState()
    switch (gameState.type) {
        case 'GettingStartedGameState':
            return <GettingStarted gameState={gameState} dispatchGameAction={dispatchGameAction} />
        case 'PlayingGameState':
            return <Playing gameState={gameState} dispatchGameAction={dispatchGameAction} />
        case 'FinishedGameState':
            return <Finished gameState={gameState} dispatchGameAction={dispatchGameAction} />
        case 'ErroredGameState':
            return <Errored gameState={gameState} />
        default:
            throw new Error('Invalid game state.')
    }
}
