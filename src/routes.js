import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from './containers/App'
import { Home } from './Home'
import { Store } from './Store'
import { Navbar } from './Navbar'
import NotFound from './NotFound'

export default () =>
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='store/:name' components={{ main: Store, navbar: Navbar }} />
    <Route path='/404' component={NotFound} />
    <Redirect from='*' to='/404' />
  </Route>
