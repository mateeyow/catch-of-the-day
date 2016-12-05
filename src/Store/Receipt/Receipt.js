import React, { Component, PropTypes } from 'react'

import OrderItems from './OrderItems'
import Total from './Total'
import style from './style.sass'

class Receipt extends Component {
  render () {
    const { orders, fishes, styleObj } = this.props

    return (
      <div className={style.root} style={styleObj}>
        <h1>Your Order</h1>
        <div className={style.orderItems}>
          {Object.keys(orders)
            .map((order, idx) =>
              <OrderItems
                order={orders[order]}
                remove={() => this.props.removeOrder(order)}
                key={idx}
                fish={fishes[order]}
              />
            )
          }
        </div>
        <Total orders={orders} fishes={fishes} />
      </div>
    )
  }
}

Receipt.propTypes = {
  orders: PropTypes.object,
  fishes: PropTypes.object,
  removeOrder: PropTypes.func,
  styleObj: PropTypes.object
}

export default Receipt
