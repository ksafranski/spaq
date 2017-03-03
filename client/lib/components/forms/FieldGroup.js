import React from 'react'
import { FormControl, FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap'

export default class FieldGroup extends React.Component {
  render () {
    return (
      <FormGroup controlId={this.props.id}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl {...this.props} />
        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
      </FormGroup>
    )
  }
}

FieldGroup.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  help: React.PropTypes.string
}
