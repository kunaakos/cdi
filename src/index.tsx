import React from 'react'
import ReactDOM from 'react-dom/client'
import { Global } from '@emotion/react'

import { Game } from './components/Game'
import { globalStyles } from './ui/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Global styles={globalStyles} />
        <Game />
    </React.StrictMode>,
)
