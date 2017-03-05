/* global sessionStorage, location */
import React from 'react'
import NavBar from '../elements/NavBar'
import request from '../../httpClient'

const primary = function (Component) {
  class Primary extends React.Component {
    constructor (props, ctx) {
      super(props, ctx)
      this.state = {
        permissions: false
      }
      request('/authenticate', 'get')
        .then((permissions) => this.setState({ permissions }))
    }

    render () {
      return (
        <div>
          {!!this.state.permissions && (
          <div>
            <NavBar />
            <div className='componentBody'>
              <Component {...this.state} {...this.props} />
            </div>
          </div>
          )}
        </div>
      )
    }
  }
  return Primary
}

export default primary
