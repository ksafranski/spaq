import React from 'react'
import request from '../../httpClient'
import { BootstrapDataTable, BootstrapDataColumn } from 'react-bootstrap-tabular'

export default class Users extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      users: false,
      error: false
    }
    request('/users', 'get')
      .then((users) => {
        this.setState({ users })
      })
  }

  render () {
    return (
      <div>
        {!!this.state.users && (
        <BootstrapDataTable data={this.state.users} bordered striped responsive>
          <BootstrapDataColumn property={'fname'} name={'First Name'} sortable />
          <BootstrapDataColumn property={'lname'} name={'Last Name'} sortable />
          <BootstrapDataColumn property={'email'} name={'Email'} sortable />
        </BootstrapDataTable>
        )}
      </div>
    )
  }
}
