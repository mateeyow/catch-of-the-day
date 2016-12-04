import React from 'react'

import style from './style.sass'

export default ({ addNewItem }) =>
  <form onSubmit={addNewItem} className={style.container}>
    <input
      type='text'
      name='name'
      required
      placeholder='Name'
      className={style.smallInput}
    />
    <input
      type='number'
      name='price'
      required
      placeholder='Price'
      className={style.smallInput}
    />
    <select name='status' defaultValue='available' className={style.smallInput}>
      <option value='available'>Fresh!</option>
      <option value='unavailable'>Sold Out!</option>
    </select>
    <textarea name='desc' required placeholder='Description' className={style.fullInput} />
    <input type='url' name='image' required placeholder='Image Url' className={style.fullInput} />
    <button type='submit' className={style.fullInput}>+ Add Item</button>
  </form>
