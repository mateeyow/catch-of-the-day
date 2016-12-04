import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import createRoute from '../routes'

const routes = createRoute()

class Root extends Component {
  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}

export default Root
