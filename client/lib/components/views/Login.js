import React from 'react'
import LoginForm from '../forms/LoginForm'

export default class Login extends React.Component {
  render () {
    return (
      <div className='Login'>
        <h2>Please Log In</h2>
        <LoginForm />
      </div>
    )
  }
}
