import { clamp } from 'lodash'
import { GridSize, RectangleSize } from '../types/types'
import { DEFAULT_CARD_SIZE, MAX_CARDS_IN_ONE_ROW, MIN_CARDS_IN_ONE_ROW } from './config'

export const fitGridIntoWrapper = (gridSize: GridSize, wrapperSize: RectangleSize): RectangleSize => {
    const { height: wrapperHeight, width: wrapperWidth } = wrapperSize
    const { cols, rows } = gridSize

    const gridAspectRatio = cols / rows
    const wrapperAspectRatio = wrapperWidth / wrapperHeight

    if (gridAspectRatio > wrapperAspectRatio) {
        // grid is wider than screen
        const gridWidth = wrapperWidth
        const gridHeight = gridWidth / gridAspectRatio
        return { width: gridWidth, height: gridHeight }
    } else {
        // grid is narrower than screen
        const gridHeight = wrapperHeight
        const gridWidth = gridHeight * gridAspectRatio
        return { width: gridWidth, height: gridHeight }
    }
}
// NOTE: will fail server-side and in tests
export const getViewportSize = (): RectangleSize => ({ height: window.innerHeight, width: window.innerWidth })

const isPortrait = ({ width, height }: RectangleSize): boolean => height >= width
const isLandscape = ({ width, height }: RectangleSize): boolean => height < width

const aspectRatioOf = ({ width, height }: RectangleSize): number => width / height

const getNumberOfCardsThatFit = (edgeLength: number): number => {
    return normalizeColOrRowCount(Math.floor(edgeLength / DEFAULT_CARD_SIZE))
}

const normalizeColOrRowCount = (value: number): number => clamp(value, MIN_CARDS_IN_ONE_ROW, MAX_CARDS_IN_ONE_ROW)

export const calculateGridSize = (container: RectangleSize, offset: number = 0): GridSize => {
    if (isPortrait(container)) {
        const rows = normalizeColOrRowCount(getNumberOfCardsThatFit(container.height) + offset)
        const cols = normalizeColOrRowCount(Math.floor(rows * aspectRatioOf(container)))
        return { cols, rows }
    } else {
        const cols = normalizeColOrRowCount(getNumberOfCardsThatFit(container.width) + offset)
        const rows = normalizeColOrRowCount(Math.floor(cols / aspectRatioOf(container)))
        return { cols, rows }
    }
}
