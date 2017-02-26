import React from 'react'
import { FormControl, FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap'

export default function({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}