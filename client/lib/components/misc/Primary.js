/* global sessionStorage, location */
import React from 'react'
import NavBar from '../elements/NavBar'

const primary = function (Component) {
  class Primary extends React.Component {
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
          <div className='componentBody'>
            <Component {...this.props} />
          </div>
        </div>
      )
    }
  }
  return Primary
}

export default primary
