import React from 'react'
import FieldGroup from './FieldGroup'
import { Button } from 'react-bootstrap'

class LoginForm extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      email: '',
      password: '',
      submitting: false
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <form>
          <FieldGroup
            id="loginEmail"
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            value={this.state.username}
            onChange={this.onChange}
          />
          <FieldGroup
            id="loginPassword"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <Button bsStyle="primary">Login</Button>
        </form>
      </div>
    )
  }
}

export default LoginForm