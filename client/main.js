import React from 'react'
import ReactDOM from 'react-dom'
import App from './lib/components/App'

const appEl = document.getElementById('app')

ReactDOM.render(<App />, appEl)

if (module.hot) {
  module.hot.accept('./lib/components/App.js', () => {
    ReactDOM.unmountComponentAtNode(appEl)
    const NextApp = require('./lib/components/App.js').default
    ReactDOM.render(<NextApp />, appEl)
  })
}
