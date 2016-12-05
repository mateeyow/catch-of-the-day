import React, { Component, PropTypes } from 'react'

import Header from './Header'
import MenuItem from './MenuItem'
import style from './style.sass'

class Menu extends Component {
  render () {
    const { fishes } = this.props

    return (
      <div className={style.root}>
        <Header />
        <div>
          {Object.keys(fishes)
            .map((fish, idx) =>
              <MenuItem
                item={fishes[fish]}
                key={idx}
                order={() => this.props.addOrder(fish)}
              />
            )
          }
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
  fishes: PropTypes.object,
  addOrder: PropTypes.func
}

export default Menu
