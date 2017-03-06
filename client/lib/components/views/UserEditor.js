import React from 'react'
import request from '../../httpClient'
import FieldGroup from '../forms/FieldGroup'
import AlertBox from '../misc/AlertBox'
import { Grid, Row, Col, Button } from 'react-bootstrap'

export default class UserEditor extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      email: '',
      fname: '',
      lname: '',
      processed: false
    }
    request(`/users/${this.props.params.id}`, 'get')
      .then((user) => {
        this.setState({
          email: user[0].email,
          fname: user[0].fname,
          lname: user[0].lname
        })
      })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      processed: false
    })
  }

  onSubmit = (e) => {
    request(`/users/${this.props.params.id}`, 'patch', {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname
    })
    .then((res) => {
      if (res.ok === 1) {
        this.setState({
          processed: {
            message: 'User record saved successfully.',
            type: 'success'
          }
        })
        return
      }
      this.setState({
        processed: {
          message: 'Could not save user record.',
          type: 'danger'
        }
      })
    })
    e.preventDefault()
  }

  render () {
    return (
      <div>
        <h4>Edit User:</h4>
        <hr />
        <form onSubmit={this.onSubmit}>
          {!!this.state.processed && (
            <AlertBox message={this.state.processed.message} type={this.state.processed.type} />
          )}
          <Grid>
            <Row>
              <Col md={4}>
                <FieldGroup
                  id='userEmail'
                  name='email'
                  type='email'
                  label='Email'
                  placeholder='Email'
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </Col>
              <Col md={4}>
                <FieldGroup
                  id='userFname'
                  name='fname'
                  type='text'
                  label='First Name'
                  placeholder='Last Name'
                  value={this.state.fname}
                  onChange={this.onChange}
                />
              </Col>
              <Col md={4}>
                <FieldGroup
                  id='loginLName'
                  name='lname'
                  type='text'
                  label='Last Name'
                  placeholder='Last Name'
                  value={this.state.lname}
                  onChange={this.onChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12} style={{textAlign: 'right'}}>
                <Button type='submit' bsStyle='primary'>Save</Button>
              </Col>
            </Row>
          </Grid>
        </form>
      </div>
    )
  }
}

UserEditor.propTypes = {
  params: React.PropTypes.object.isRequired
}
