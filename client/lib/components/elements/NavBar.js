import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default class NavBar extends React.Component {

  handleLogout = () => {
    sessionStorage.removeItem('token')
    location.href = '/login'
  }

  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'>Application</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href='/'>Dashboard</NavItem>
            <NavItem eventKey={2} href='/users'>Users</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.handleLogout}>Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
