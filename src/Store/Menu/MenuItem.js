import React from 'react'

import { formatPrice } from '../../helpers'
import style from './style.sass'

export default ({ item, order }) =>
  <div className={style.item}>
    <div>
      <img src={item.image} />
    </div>
    <div>
      <h1 className={style.itemName}>
        {item.name}
        <span>{formatPrice(item.price)}</span>
      </h1>
      <p className={style.itemDesc}>{item.desc}</p>
      {item.status === 'available'
        ? <button type='button' onClick={order} className={style.addToOrder}>
            Add to order
          </button>
        : <button type='button' className={style.soldOut} disabled>
            Sold Out!
          </button>
      }
    </div>
  </div>
