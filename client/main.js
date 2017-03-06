import React from 'react'
import ReactDOM from 'react-dom'
import App from './lib/components/App'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const appEl = document.getElementById('app')

ReactDOM.render(<App history={history} />, appEl)

if (module.hot) {
  module.hot.accept('./lib/components/App.js', () => {
    ReactDOM.unmountComponentAtNode(appEl)
    const NextApp = require('./lib/components/App.js').default
    ReactDOM.render(<NextApp history={history} />, appEl)
  })
}
