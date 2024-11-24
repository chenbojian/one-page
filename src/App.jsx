import { createEffect, createSignal } from 'solid-js'
import { Router, Route } from '@solidjs/router'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chapter from './components/Chapter'
import { createStore } from "solid-js/store"
import Book from './components/Book'


function App() {

  return (
    <>
      <Router>
        <Route path="/book" component={Book} />
        <Route path="/chapter" component={Chapter} />
      </Router>
    </>
  )
}

export default App
