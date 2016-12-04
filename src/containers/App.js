import React from 'react'
import Helmet from 'react-helmet'

export default ({ children }) =>
  <div>
    <Helmet
      titleTemplate='%s | Catch of the Day!'
    />
    {children}
  </div>
