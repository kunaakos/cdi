import styled from '@emotion/styled'
import { CARD_GAP, COLORS } from '../util/config'

export const Layers = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

export const Layer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

export const Overlay = styled.div`
    width: 100%;
    height: 100%;
    background: ${COLORS.bgDarker};
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    /* quick and dirty styles so we can display any text, eg. for a loading screen */
    color: ${COLORS.highlight};
    padding: ${CARD_GAP * 2}px;
    box-sizing: border-box;
`

export const StatusTab = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    /* quick and dirty styles */
    color: ${COLORS.highlight};
    background: ${COLORS.brand};
    padding: ${CARD_GAP}px;
    box-sizing: border-box;
`
