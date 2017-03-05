import React from 'react'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

export default class Link extends React.Component {

  handleClick = () => {
    history.push(this.props.to)
    location.href = this.props.to
  }

  render () {
    return (
      <div onClick={this.handleClick}>{this.props.title}</div>
    )
  }
}

Link.propTypes = {
  to: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
}
