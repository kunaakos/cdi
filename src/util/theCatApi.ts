import { v4 as uuid } from 'uuid'

import { Cat } from '../types/types'

const CAT_API_KEY = '7a828164-4095-4a41-bef4-084aaa5aff89'

type SomethingCatty = {
    id: string
    url: string
}

const isSomethingCatty = (object: any): object is SomethingCatty =>
    object.id && typeof object.id === `string` && object.url && typeof object.url === `string`

const validateApiCats = (data: any): SomethingCatty[] => {
    if (Array.isArray(data) && data.every(isSomethingCatty)) {
        return data
    } else {
        throw new Error("We have something to work with but they don't (all) look like cats.")
    }
}

const fromCattyToProperCat = (somethingCatty: SomethingCatty): Cat => ({
    type: 'Cat',
    id: uuid(),
    imageUrl: somethingCatty.url,
})

export const fetchCats = async (amount: number): Promise<Cat[]> => {
    if (amount > 100) {
        throw new Error('Not enough cats.')
    }

    let response: Response | null = null

    try {
        response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${amount}&size=small`, {
            headers: { 'x-api-key': CAT_API_KEY },
        })
    } catch (error) {
        throw new Error('Cats unreachable.')
    }

    if (!response.ok) {
        throw new Error('Cats unavailable.')
    }

    return validateApiCats(await response.json()).map(fromCattyToProperCat)
}
