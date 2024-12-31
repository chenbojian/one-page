/* src/state/index.js */
import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'

const savedState = localStorage.getItem('appState')
console.log('loading from localstorage')
const [appState, setAppState] = createStore(savedState ? JSON.parse(savedState) : {
    books: {},
    chapters: {},
})

createEffect(() => {
    localStorage.setItem('appState', JSON.stringify(appState))
})

export const useAppState = () => [appState, setAppState]

