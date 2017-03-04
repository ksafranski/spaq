/* global sessionStorage, location */
import React from 'react'
import NavBar from '../elements/NavBar'

const primary = function (Component) {
  class Wrapper extends React.Component {
    constructor (props, ctx) {
      super(props, ctx)
      if (!sessionStorage.getItem('token')) {
        location.href = '/login'
      }
    }

    render () {
      return (
        <div>
          <NavBar />
          <Component {...this.props} />
        </div>
      )
    }
  }
  return Wrapper
}

export default primary
