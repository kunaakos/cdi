# Memories of cats

A cat memory game written in [TypeScript](https://www.typescriptlang.org/) using [React](https://reactjs.org/) as a view library and [Emotion](https://emotion.sh/) for styling. State management was done with React builtins, and with a little help from [use-reducer-async](https://www.npmjs.com/package/use-reducer-async).

Check it out [live](https://kunaakos.github.io/cdi)!

I spent waaaay too much time figuring out how to do the resizeable board, and code quality has suffered as a result - styling and view components were quickly hacked together, and I did not use emotion theming either.

What could urgently use more work:

- error handling
- preloading images (some cat api pics will load slowly or not at all)
- harline pixel errors that influence layout

But my main focus was the resizable board, and I sacrificed everything else, including code quality in some places!

I used [Prettier](https://prettier.io/) for formatting, and I'm not always happy about what it does to JSX, but I favor consistency over perfectly formatted code. 

I did not write tests, but made sure everything is testable.
# Running

This project was built with [Create React App](https://github.com/facebook/create-react-app).

To start, use the default `npm start` after an `npm install`. If you use nvm, don't forget to `nvm use` from the project root before doing anything, otherwise make sure you're using the recommended node version from `.nvmrc`.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
