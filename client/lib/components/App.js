import React from 'react'
import { Router, Route } from 'react-enroute'
import Home from './views/Home'
import NotFound from './views/NotFound'

class App extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      location: window.location.pathname
    }
  }

  render () {
    return (
      <Router {...this.state}>
        <Route path='/' component={Home} />
        <Route path='*' component={NotFound} />
      </Router>
    )
  }
}

export default App
