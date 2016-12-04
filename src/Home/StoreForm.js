import React, { PropTypes } from 'react'

import { getFunName } from '../helpers'
import style from './Home.sass'

const storeForm = ({ onSubmit }) =>
  <form onSubmit={onSubmit} className={style.storeForm}>
    <input
      type='text'
      name='store'
      placeholder='Store Name'
      defaultValue={getFunName()}
      required
    />
    <button type='submit'>Submit</button>
  </form>

storeForm.propTypes = {
  onSubmit: PropTypes.func
}

export default storeForm
