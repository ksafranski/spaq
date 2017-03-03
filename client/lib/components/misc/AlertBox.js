import React from 'react'
import { Alert } from 'react-bootstrap'

export default class AlertBox extends React.Component {
  render () {
    return (
      <Alert className='AlertBox' bsStyle={this.props.type}>
        {this.props.message}
      </Alert>
    )
  }
}

AlertBox.propTypes = {
  type: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired
}
