import React from 'react'
import request from '../../httpClient'
import { BootstrapDataTable, BootstrapDataColumn } from 'react-bootstrap-tabular'
import Link from '../elements/Link'

export default class Users extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      users: false,
      error: false
    }
    request('/users', 'get')
      .then((users) => {
        users.map((x) => {
          // Add edit link
          const path = `/users/${x._id}`
          x.edit = <Link to={path} icon='glyphicon glyphicon-pencil' />
          return x
        })
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
          <BootstrapDataColumn property={'edit'} name={'Edit'} align='center' />
        </BootstrapDataTable>
        )}
      </div>
    )
  }
}
