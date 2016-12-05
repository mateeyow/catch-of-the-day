import React from 'react'

import style from './style.sass'

export default ({ item, remove, edit, prop }) =>
  <div className={style.container}>
    <input
      type='text'
      name='name'
      required
      placeholder='Name'
      value={item.name}
      onChange={ev => edit(prop, ev, 'name')}
      className={style.smallInput}
    />
    <input
      type='text'
      name='price'
      required
      placeholder='Price'
      value={item.price}
      onChange={ev => edit(prop, ev, 'price')}
      className={style.smallInput}
    />
    <select
      value={item.status}
      name='status'
      onChange={ev => edit(prop, ev, 'status')}
      className={style.smallInput}
    >
      <option value='available'>Fresh!</option>
      <option value='unavailable'>Sold Out!</option>
    </select>
    <textarea
      name='desc'
      required
      placeholder='Description'
      value={item.desc}
      onChange={ev => edit(prop, ev, 'desc')}
      className={style.fullInput}
    />
    <input
      type='text'
      name='image'
      required
      placeholder='Image Url'
      value={item.image}
      onChange={ev => edit(prop, ev, 'image')}
      className={style.fullInput}
    />
    <button type='button' onClick={remove} className={style.fullInput}>Remove</button>
  </div>
