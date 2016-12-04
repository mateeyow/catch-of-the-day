import React from 'react'

import { formatPrice } from '../../helpers'
import style from './style.sass'

export default ({ order }) =>
  <div className={style.orderItemCont}>
    <span>{order.quantity}lbs{order.name}</span>
    <span>{formatPrice(Number(order.price) * order.quantity)}</span>
  </div>
