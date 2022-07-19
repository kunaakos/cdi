import { v4 as uuid } from 'uuid'
import { shuffle } from 'lodash'

import { Card, Cat } from '../types/types'
import { isEven } from './misc'
import { fetchCats } from './theCatApi'

export const generateCardFromCat = (cat: Cat): Card => ({
    type: 'Card',
    id: uuid(),
    cat,
})

export const generateCards = async (amount: number): Promise<Card[]> => {
    if (!isEven(amount)) {
        throw new Error('Cannot generate an odd number of cards.')
    }
    const cats = await fetchCats(amount / 2)
    // NOTE: we generate two cards for each cat
    return shuffle([...cats, ...cats].map(generateCardFromCat))
}
