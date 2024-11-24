/* src/state/index.js */
import { createStore } from 'solid-js/store'

const [appState, setAppState] = createStore({
    books: {},
    chapters: {},
})

export const useAppState = () => [appState, setAppState]

