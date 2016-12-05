import React, { Component, PropTypes } from 'react'

import Form from './Form'
import InventoryItem from './InventoryItem'
import LoginBtn from './LoginBtn'
import ErrorMsg from './ErrorMsg'
import style from './style.sass'

class Inventory extends Component {
  render () {
    const { loadSample, fishes, firebase, owner, styleObj } = this.props

    if (!firebase.uid) {
      return (
        <div className={style.loginContainer} style={styleObj}>
          <h3>Sign in to manage your store's inventory</h3>
          {firebase.authError.message &&
            <ErrorMsg message={firebase.authError.message} />
          }
          <LoginBtn login={this.props.login} provider='github' />
          <LoginBtn login={this.props.login} provider='google' />
        </div>
      )
    }

    if (owner && owner !== firebase.uid) {
      return (
        <div style={styleObj}>
          <h3>Sorry, you aren't the owner of this store</h3>
        </div>
      )
    }

    return (
      <div style={styleObj}>
        <h1 className={style.inventoryHead}>Inventory</h1>
        {Object.keys(fishes)
          .map((item, idx) =>
            <InventoryItem
              item={fishes[item]}
              key={idx}
              remove={() => this.props.removeItem(item)}
              edit={this.props.editItem}
              prop={item}
            />
          )
        }
        <Form addNewItem={this.props.addNewItem} />
        {Object.keys(fishes).length === 0 &&
          <button type='button' onClick={loadSample} className={style.loadSample}>
            Load Sample Fishes
          </button>
        }
      </div>
    )
  }
}

Inventory.propTypes = {
  loadSample: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired,
  fishes: PropTypes.object,
  addNewItem: PropTypes.func,
  removeItem: PropTypes.func,
  editItem: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func,
  owner: PropTypes.string,
  styleObj: PropTypes.object
}

export default Inventory
