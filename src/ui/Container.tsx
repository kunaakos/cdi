import styled from '@emotion/styled'
import { CARD_GAP, COLORS } from '../util/config'

/**
 * Some carpet-bombing style styling, and a do-it-all layout container!
 */

export const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    margin: ${CARD_GAP * 3}px auto 0 0;
    max-width: 800px;
    background: ${COLORS.brand};
    padding: ${CARD_GAP * 3}px ${CARD_GAP * 2}px;
    p {
        color: ${COLORS.textLight};
    }

    h1 {
        color: ${COLORS.highlight};
    }

    a,
    a:visited,
    a:hover,
    a:focus,
    a:active {
        color: ${COLORS.highlight};
        text-decoration-thickness: 0.125em;
    }
`
