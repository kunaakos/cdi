import styled from '@emotion/styled'

import { CARD_GAP, COLORS } from '../util/config'

export const BlankCard = styled.div`
    width: calc(100% - ${CARD_GAP}px);
    height: calc(100% - ${CARD_GAP}px);
    margin: ${CARD_GAP / 2}px;
    background-color: ${COLORS.bg};
    border-radius: ${CARD_GAP}px;
`
