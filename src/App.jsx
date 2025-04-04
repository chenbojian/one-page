import { createEffect, createSignal } from 'solid-js'
import { HashRouter, Route } from '@solidjs/router'
import './App.css'
import Chapter from './components/manki/Chapter'

import Home from './components/home/Home'
import Book from './components/manki/Book'
import Books from './components/manki/Books'
import Jd from './components/jd/Jd'


function App() {

  return (
    <>
      <HashRouter>
        <Route path="/" component={Home} />
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
