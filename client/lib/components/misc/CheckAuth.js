/* global sessionStorage, location */
import React from 'react'

const checkAuth = function (Component) {
  class Wrapper extends React.Component {
    constructor (props, ctx) {
      super(props, ctx)
      if (!sessionStorage.getItem('token')) {
        location.href = '/login'
      }
    }

    render () {
      return (
        <Component {...this.props} />
      )
    }
  }
  return Wrapper
}

export default checkAuth
