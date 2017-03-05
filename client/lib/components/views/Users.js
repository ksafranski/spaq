import React from 'react'
import request from '../../httpClient'
import Link from '../elements/Link'
import DataTable from '../elements/DataTable'

export default class Users extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      error: false,
      users: false
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
    const columns = [
      { property: 'fname', name: 'First Name', sortable: true },
      { property: 'lname', name: 'Last Name' },
      { property: 'email', name: 'Email' },
      { property: 'edit', name: 'Edit' }
    ]
    return (
      <DataTable
        data={this.state.users}
        columns={columns}
      />
    )
  }
}
