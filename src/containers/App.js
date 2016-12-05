import React from 'react'
import Helmet from 'react-helmet'

export default ({ children, main, navbar }) =>
  <div>
    <Helmet
      titleTemplate='%s | Catch of the Day!'
    />
    {navbar}
    {main}
    {children}
  </div>
