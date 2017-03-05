import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Link from './Link'

export default class NavBar extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    console.log('PROPS', props)
  }

  handleLogout = () => {
    sessionStorage.removeItem('token')
    location.href = '/login'
  }

  render () {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'>Application</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}><Link to='/' title='Home' /></NavItem>
            <NavItem eventKey={2}><Link to='/users' title='Users' /></NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.handleLogout}>Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
