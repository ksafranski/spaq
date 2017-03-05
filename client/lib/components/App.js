import React from 'react'
import { Router, Route } from 'react-enroute'
import primary from './misc/Primary'
import Login from './views/Login'
import Home from './views/Home'
import Users from './views/Users'
import UserEditor from './views/UserEditor'
import NotFound from './views/NotFound'

export default class App extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      location: window.location.pathname
    }
  }

  render () {
    return (
      <Router {...this.state}>
        <Route path='/' component={primary(Home)} />
        <Route path='/users' component={primary(Users)} />
        <Route path='/users/:id' component={primary(UserEditor)} />
        <Route path='/login' component={Login} />
        <Route path='*' component={NotFound} />
      </Router>
    )
  }
}
