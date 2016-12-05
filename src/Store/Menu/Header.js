import React from 'react'

import style from './style.sass'

export default () =>
  <header className={style.header}>
    <h1>
      Catch
      <span className={style.ofThe}>
        <span> of </span>
        <span>the </span>
      </span>
      Day
    </h1>
    <h3>
      <span>Fresh Seafood Market</span>
    </h3>
  </header>
