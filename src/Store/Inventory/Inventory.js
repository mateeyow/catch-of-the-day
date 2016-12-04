import React, { Component, PropTypes } from 'react'

import Form from './Form'
import InventoryItem from './InventoryItem'
import LoginBtn from './LoginBtn'
import ErrorMsg from './ErrorMsg'
import style from './style.sass'

class Inventory extends Component {
  render () {
    const { loadSample, fishes, firebase } = this.props

    if (!firebase.uid) {
      return (
        <div className={style.loginContainer}>
          <h3>Sign in to manage your store's inventory</h3>
          {firebase.authError.message &&
            <ErrorMsg message={firebase.authError.message} />
          }
          <LoginBtn login={this.props.login} provider='github' />
          <LoginBtn login={this.props.login} provider='google' />
        </div>
      )
    } else {
      return (
        <div>
          <h1>Inventory</h1>
          <button type='button' onClick={this.props.logout}>Log out</button>
          {fishes
            .map((item, idx) =>
              <InventoryItem
                item={item}
                key={idx}
                remove={() => this.props.removeItem(idx)}
                edit={this.props.editItem}
                idx={idx}
              />
            )
          }
          <Form addNewItem={this.props.addNewItem} />
          {fishes.length === 0 &&
            <button type='button' onClick={loadSample}>Load Sample Fishes</button>
          }
        </div>
      )
    }
  }
}

Inventory.propTypes = {
  loadSample: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired,
  fishes: PropTypes.array,
  addNewItem: PropTypes.func,
  removeItem: PropTypes.func,
  editItem: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func
}

export default Inventory
