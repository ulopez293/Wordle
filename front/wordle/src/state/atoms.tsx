import { atom } from 'jotai'

export const userDataAtom = atom({
    name: ``,
    games: 0,
    wins: 0,
    losses: 0
})
export const tokenDataAtom = atom('')