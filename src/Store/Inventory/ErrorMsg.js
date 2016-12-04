import React from 'react'
import Warning from 'react-icons/lib/md/warning'

import style from './style.sass'

export default ({ message }) =>
  <div className={style.error}>
    <h3>
      <Warning />
      Error
    </h3>
    <p>{message}</p>
  </div>
