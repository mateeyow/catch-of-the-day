import React from 'react'

import { formatPrice } from '../../helpers'
import style from './style.sass'

export default ({ orders, fishes }) => {
  let total = 0

  for (var key in orders) {
    const order = orders[key]
    if (fishes[key] && order.status === 'available') {
      const amount = Number(fishes[key].price) * order.quantity
      total += amount
    }
  }

  return (
    <div className={style.totalContainer}>
      <span>Total:</span>
      <span>{formatPrice(total)}</span>
    </div>
  )
}
