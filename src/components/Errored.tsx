import { ErroredGameState } from '../types/types'

import { Container } from '../ui/Container'

type ErroredProps = {
    gameState: ErroredGameState
}

export const Errored = ({ gameState }: ErroredProps) => {
    return (
        <Container>
            <h1>Oh noes!</h1>
            <p>
                One of the cats threw up all over the place. Sorry for the inconvenience, but we need to clean up. Come
                back later to see if it feels better!
            </p>
        </Container>
    )
}
