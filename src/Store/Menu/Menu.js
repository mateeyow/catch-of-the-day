import React, { Component, PropTypes } from 'react'

import Header from './Header'
import MenuItem from './MenuItem'
import style from './style.sass'

class Menu extends Component {
  render () {
    const { fishes, styleObj } = this.props

    return (
      <div className={style.root} style={styleObj}>
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
  addOrder: PropTypes.func,
  styleObj: PropTypes.object
}

export default Menu
