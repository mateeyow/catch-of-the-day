import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { Inventory } from './Inventory'
import { Menu } from './Menu'
import { Receipt } from './Receipt'
import fishes from '../fishes'
import { properName } from '../helpers'
import style from './Store.sass'
import {
  loadSamples, addItem, removeItem,
  editItem, addOrder
} from './actions'

class Store extends Component {
  constructor () {
    super()
    this.loadSampleData = this.loadSampleData.bind(this)
    this.addNewItem = this.addNewItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.onUpdateItem = this.onUpdateItem.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  loadSampleData () {
    const { loadSamples, store } = this.props
    if (store.fishes.length === 0) {
      loadSamples(fishes)
    }
  }

  addNewItem (ev) {
    ev.preventDefault()
    const {
      name, desc, image,
      price, status
    } = ev.target
    const { addItem } = this.props

    addItem({
      name: name.value,
      desc: desc.value,
      image: image.value,
      price: price.value,
      status: status.value
    })
    ev.target.reset()
  }

  removeItem (idx) {
    const { removeItem } = this.props
    removeItem(idx)
  }

  onUpdateItem (idx, data, name) {
    const { editItem, store: { fishes } } = this.props
    const { value } = data.target
    let obj = Object.assign({}, fishes[idx], { [name]: value })
    editItem(obj, idx)
  }

  addToOrder (item) {
    const { addOrder } = this.props
    addOrder(item)
  }

  handleLogin (provider) {
    const { store: { firebase: { helpers } } } = this.context
    helpers.login(properName(provider))
  }

  handleLogout () {
    const { store: { firebase: { helpers } } } = this.context
    helpers.logout()
  }

  render () {
    const { store } = this.props

    return (
      <div className={style.root}>
        <Helmet title='Menu' />
        <Menu
          fishes={store.fishes}
          addOrder={this.addToOrder}
        />
        <Receipt
          orders={store.orders}
        />
        <Inventory
          fishes={store.fishes}
          loadSample={this.loadSampleData}
          addNewItem={this.addNewItem}
          removeItem={this.removeItem}
          editItem={this.onUpdateItem}
          login={this.handleLogin}
          logout={this.handleLogout}
          firebase={this.props.firebase}
        />
      </div>
    )
  }
}

Store.propTypes = {
  loadSamples: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  editItem: PropTypes.func,
  addOrder: PropTypes.func
}

Store.contextTypes = {
  store: PropTypes.object
}

export default connect(
  state => state,
  { loadSamples, addItem, removeItem, editItem, addOrder }
)(Store)
