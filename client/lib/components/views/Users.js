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
    // Get and build users data
    request('/users', 'get')
      .then((users) => {
        users.map((x) => {
          // Add edit link
          x.edit = <Link to={`/users/${x._id}`} icon='glyphicon glyphicon-pencil' />
          x.delete = <Link to={`/`} icon='glyphicon glyphicon-remove' />
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
      { property: 'edit', name: 'Edit', align: 'center' },
      { property: 'delete', name: 'Delete', align: 'center' }
    ]
    return (
      <DataTable
        data={this.state.users}
        columns={columns}
      />
    )
  }
}
