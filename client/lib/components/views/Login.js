import React from 'react'
import { Col, Row } from 'react-bootstrap'
import LoginForm from '../forms/LoginForm'

class Login extends React.Component {
  render () {
    return (
      <div>
        <Row>
          <Col sm={3} />
          <Col sm={6}>
            <h2>Please Log In</h2>
          </Col>
          <Col sm={3} />
        </Row>
        <Row>
          <Col sm={3} />
          <Col sm={6}>
            <LoginForm />
          </Col>
          <Col sm={3} />
        </Row>
      </div>
    )
  }
}

export default Login
