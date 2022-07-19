import { FinishedGameState } from '../types/types'

import { GameAction } from '../hooks/useGameState'
import { Container } from '../ui/Container'

type FinishedProps = {
    gameState: FinishedGameState
    dispatchGameAction: React.Dispatch<GameAction>
}

export const Finished = ({ gameState, dispatchGameAction }: FinishedProps) => {
    const restartClickHandler = () => dispatchGameAction({ type: 'RestartGameAction' })
    return (
        <Container>
            <h1>Hooray!</h1>
            <p>
                You found and matched all the cats. You can keep them.{' '}
                <a href="#" onClick={restartClickHandler}>
                    Have another go
                </a>
                , if you'd like!
            </p>
        </Container>
    )
}
