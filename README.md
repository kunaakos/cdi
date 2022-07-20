# Memories of cats

A cat themed memory game written in [TypeScript](https://www.typescriptlang.org/) using [React](https://reactjs.org/) as a view library and [Emotion](https://emotion.sh/) for styling. State management was done with React builtins, and with a little help from [use-reducer-async](https://www.npmjs.com/package/use-reducer-async).

Check it out [live](https://kunaakos.github.io/cdi)!

I spent waaaay too much time figuring out how to do the resizeable board, and code quality has suffered as a result - styling and view components were quickly hacked together, and I did not use emotion theming either.

What could urgently use more work:

- error handling (but to be fair there weren't many runtime errors to catch due to the type-driven approach)
- preloading images (some cat api pics will load slowly or not at all, especially the animated ones)
- harline pixel errors that influence layout

But my main focus was the resizable board, and I sacrificed everything else, including code quality in some places!

I used [Prettier](https://prettier.io/) for formatting, and I'm not always happy about what it does to JSX, but I favor consistency over perfectly formatted code. 

I did not write tests, but made sure everything is testable.

# Design Notes

I used a type-driven approach for writing this. Types used throughout the game are declared in [types.ts](src/types/types.ts). `GameState` objects hold all the information relevant to the game - there's not much need for internal state in components. They have several distinct types, like `PlayingGameState` or `GettingStartedGameState`, and in the view layer there are matching components for each state.

The [`useGameState` hook](/src/hooks/useGameState.ts) provides `GameState` and handles actions dispatched from components. This is as thin as possible, with game logic being implemented as (composable) utility functions taking and returning `GameState`s, these can be found in [game.ts](src/util/game.ts).

Using this approach Components can stay textbook "dumb" or "slim", a good example being [Playing.tsx](src/components/Playing.tsx) - which renders the view for both single player and multiplayer gameplay. Different game states and views are matched in [Game.tsx](src/components/Game.tsx).

I made sure the game is playable and looks decent, with a minimalist text-based interface. All the underlying data is accessible in components to build a flashier UI, and even in its current state, adding new features isn't a headache, see [the commit I added multiplayer functionality with](https://github.com/kunaakos/cdi/commit/2ac3921fa9442c4793ef72664ae1948e0bd6feb2).
# Running

This project was built with [Create React App](https://github.com/facebook/create-react-app).

To start, use the default `npm start` after an `npm install`. If you use nvm, don't forget to `nvm use` from the project root before doing anything, otherwise make sure you're using the recommended node version from `.nvmrc`.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
