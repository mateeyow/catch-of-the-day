import React from 'react'

import { formatPrice } from '../../helpers'
import style from './style.sass'

export default ({ order, remove, fish }) => {
  if (!fish) {
    return (
      <div className={style.orderItemCont}>
        <span className={style.orderName}>
          Sorry fish is no longer available
        </span>
        <button onClick={remove}>&times;</button>
      </div>
    )
  }

  return (
    <div className={style.orderItemCont}>
      <span className={style.orderName}>
        {order.quantity}lbs {fish.name}
        <button onClick={remove}>&times;</button>
      </span>
      <span>{formatPrice(Number(fish.price) * order.quantity)}</span>
    </div>
  )
}
