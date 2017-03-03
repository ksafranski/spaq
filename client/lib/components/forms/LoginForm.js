import React from 'react'
import FieldGroup from './FieldGroup'
import AlertBox from '../misc/AlertBox'
import { Button } from 'react-bootstrap'
import request from '../../httpClient'

export default class LoginForm extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      email: '',
      password: '',
      error: false
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    request('/authenticate', 'post', this.state)
      .then((data) => {
        sessionStorage.setItem('token', data)
        location.href = '/'
      })
      .catch((err) => {
        this.setState({
          error: { type: 'danger', message: err.message }
        })
      })
    e.preventDefault()
  }

  render () {
    return (
      <div>
        {!!this.state.error && (
          <AlertBox message={this.state.error.message} type={this.state.error.type} />
        )}
        <form onSubmit={this.onSubmit}>
          <FieldGroup
            id='loginEmail'
            name='email'
            type='email'
            label='Email'
            placeholder='Email'
            value={this.state.username}
            onChange={this.onChange}
          />
          <FieldGroup
            id='loginPassword'
            name='password'
            type='password'
            label='Password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.onChange}
          />
          <Button type='submit' bsStyle='primary'>Login</Button>
        </form>
      </div>
    )
  }
}
