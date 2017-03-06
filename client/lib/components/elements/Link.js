import React from 'react'

const withRouter = (Component) => {
  class WrappedComponent extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    render () {
      return React.createElement(Component, { ...this.props, router: this.context.router })
    }
  }
  return WrappedComponent
}

export class Link extends React.Component {
  handleClick = () => {
    this.props.router.push(this.props.to)
  }

  render () {
    return (
      <div className='Link' onClick={this.handleClick}>
        {this.props.title || <span className={this.props.icon} />}
      </div>
    )
  }
}

Link.propTypes = {
  to: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  icon: React.PropTypes.string,
  router: React.PropTypes.object.isRequired
}

export default withRouter(Link)
