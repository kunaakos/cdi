import { GridSize } from '../types/types'

export const isEven = (value: number): boolean => value % 2 === 0

export const roundDownToEven = (value: number): number => 2 * Math.floor(value / 2)

export const numberOfCardsThatFit = (gridSize: GridSize) => roundDownToEven(gridSize.rows * gridSize.cols)

export const NOOP = () => {}

export const wait = async (delay: number) => {
    await new Promise((resolve) => setTimeout(resolve, delay))
}

export const allTheSame = (array: any[]): boolean => array.every((element) => element === array[0])
