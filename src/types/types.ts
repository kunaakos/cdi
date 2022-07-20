/**
 * I'll be doing Type Driven Development, so before everything else I'll declare
 * type definitions of all the entities I'll be working with.
 * Normally this would be broken up and grouped, but this is an example app and
 * type definitions are concise enough to all fit in a single module that can be
 * read top to bottom like any text document.
 */

// The most important entity in this app: CATS!
export type Cat = {
    type: 'Cat'
    id: Id
    imageUrl: string
}

// Cards are a representation of a `Cat`.
export type Card = {
    type: 'Card'
    id: Id
    cat: Cat
}

// And a `Board` is what you lay your cards out on, but also defines the shape of your cards
export type Board = {
    type: 'Board'
    gridSize: GridSize
}

/**
 * The game itself can be declared as a finite state machine.
 * Note that this is framework-agnostic! Anything that isn't (e.g. reducers and actions) should
 * be declared as part of application logic.
 */
export type GameState = GettingStartedGameState | PlayingGameState | FinishedGameState | ErroredGameState

// The initial step: gathering board and card config.
export type GettingStartedGameState = {
    type: 'GettingStartedGameState'
    loading: boolean
}

type GamePlayState = {
    board: Board
    cards: Card[]
    foundCatIds: Id[]
    flippedCardIds: Id[]
    players: Player[]
    matchCount: number[]
    currentPlayer: number
}

export type PlayingGameState = GamePlayState & {
    type: 'PlayingGameState'
}

export type FinishedGameState = GamePlayState & {
    type: 'FinishedGameState'
}

export type ErroredGameState = {
    type: 'ErroredGameState'
}

/**
 * The rest are utility types, declared here like footnotes in a text document.
 */

export type Id = string

export type GridSize = {
    cols: number
    rows: number
}

export type RectangleSize = {
    width: number
    height: number
}

// for the sake of simplicity we'll store player names only and reference players
// by the index of the array they're stored in.
export type Player = string

/**
 * That's all!
 */
