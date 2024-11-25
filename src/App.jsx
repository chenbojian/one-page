import { createEffect, createSignal } from 'solid-js'
import { HashRouter, Route } from '@solidjs/router'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chapter from './components/Chapter'
import { createStore } from "solid-js/store"
import Book from './components/Book'
import Books from './components/Books'


function App() {

  return (
    <>
      <HashRouter>
        <Route path="" component={Books} />
        <Route path="/book" component={Book} />
        <Route path="/chapter" component={Chapter} />
      </HashRouter>
    </>
  )
}

export default App
