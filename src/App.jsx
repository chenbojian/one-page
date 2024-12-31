import { createEffect, createSignal } from 'solid-js'
import { HashRouter, Route } from '@solidjs/router'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chapter from './components/manki/Chapter'

import Book from './components/manki/Book'
import Books from './components/manki/Books'
import Jd from './components/jd/Jd'


function App() {

  return (
    <>
      <HashRouter>
        <Route path="/jd" component={Jd} />
        <Route path="/manki">
          <Route path="" component={Books} />
          <Route path="/book" component={Book} />
          <Route path="/chapter" component={Chapter} />
        </Route>
      </HashRouter>
    </>
  )
}

export default App
