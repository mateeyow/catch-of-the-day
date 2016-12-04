import React, { Component, PropTypes } from 'react'

import OrderItems from './OrderItems'
import Total from './Total'
import style from './style.sass'

class Receipt extends Component {
  render () {
    const { orders } = this.props

    return (
      <div className={style.root}>
        <h1>Your Order</h1>
        <div className={style.orderItems}>
          {Object.keys(orders)
            .map((order, idx) =>
              <OrderItems
                order={orders[order]}
                key={idx}
              />
            )
          }
        </div>
        <hr />
        <Total orders={orders} />
        <hr />
      </div>
    )
  }
}

Receipt.propTypes = {
  orders: PropTypes.object
}

export default Receipt
