import React from 'react'
import PageHeader from 'react-bootstrap/lib/PageHeader'

class NotFound extends React.Component {
  render () {
    return (
      <PageHeader>
        Not Found<br /><small>The page you requested does not exist</small>
      </PageHeader>
    )
  }
}

export default NotFound
