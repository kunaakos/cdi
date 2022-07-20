import { FinishedGameState } from '../types/types'

import { isPlural } from '../util/misc'
import { getResults, isMultiplayerGame } from '../util/game'
import { GameAction } from '../hooks/useGameState'

import { Container } from '../ui/Container'

type FinishedProps = {
    gameState: FinishedGameState
    dispatchGameAction: React.Dispatch<GameAction>
}

const generateResultsString = (gameState: FinishedGameState): string =>
    getResults(gameState)
        .map(([playerName, matchCount]) => `${playerName} got ${matchCount} ${isPlural(matchCount) ? 'cats' : 'cat'}`)
        .join(', ')

export const Finished = ({ gameState, dispatchGameAction }: FinishedProps) => {
    const restartClickHandler = () => dispatchGameAction({ type: 'RestartGameAction' })
    const showResults = isMultiplayerGame(gameState)
    return (
        <Container>
            <h1>Hooray!</h1>
            {!showResults && <p>You found and matched all the cats. You can keep them.</p>}
            {showResults && (
                <p>Great job, team, you found all the cats! {generateResultsString(gameState)}. Excellent.</p>
            )}
            <p>
                <a href="#" onClick={restartClickHandler}>
                    Have another go
                </a>
                , if you'd like!
            </p>
        </Container>
    )
}
