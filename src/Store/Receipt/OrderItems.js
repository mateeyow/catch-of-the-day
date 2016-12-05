import React from 'react'

import { formatPrice } from '../../helpers'
import style from './style.sass'

export default ({ order, remove }) =>
  <div className={style.orderItemCont}>
    <span className={style.orderName}>
      {order.quantity}lbs {order.name}
      <button onClick={remove}>&times;</button>
    </span>
    <span>{formatPrice(Number(order.price) * order.quantity)}</span>
  </div>
