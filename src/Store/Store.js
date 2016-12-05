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
  editItem, addOrder, removeOrder
} from './actions'

class Store extends Component {
  constructor () {
    super()
    this.loadSampleData = this.loadSampleData.bind(this)
    this.addNewItem = this.addNewItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.onUpdateItem = this.onUpdateItem.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.removeToOrder = this.removeToOrder.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount () {
    const { store: { firebase: { helpers } } } = this.context
    const { params: { name } } = this.props
    helpers.watch(name)
  }

  componentDidMount () {
    const { store: { firebase: { helpers } } } = this.context
    const { params: { name } } = this.props
    const ref = helpers.database.ref(name)

    ref
      .once('value')
      .then(snap => {
        const data = snap.val() || {}
        const { firebase } = this.props

        if (!data.owner && firebase.uid) {
          ref.set({ owner: firebase.uid })
        }
      })
  }

  componentWillUpdate ({ store, firebase }) {
    const { store: { firebase: { helpers } } } = this.context
    const { params: { name } } = this.props
    if (firebase.isUpdated) {
      helpers
        .database
        .ref(`${name}/fishes`)
        .set(store.fishes)
    }
  }

  loadSampleData () {
    const { loadSamples, store } = this.props
    if (Object.keys(store.fishes).length === 0) {
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
      [`fish${Date.now()}`]: {
        name: name.value,
        desc: desc.value,
        image: image.value,
        price: price.value,
        status: status.value
      }
    })
    ev.target.reset()
  }

  removeItem (key) {
    const { removeItem } = this.props
    removeItem(key)
  }

  onUpdateItem (prop, data, name) {
    const { editItem, store: { fishes } } = this.props
    const { value } = data.target
    const obj = Object.assign({}, fishes[prop], { [name]: value })
    editItem({ [prop]: obj }, prop)
  }

  addToOrder (key) {
    const { addOrder, store: { fishes, orders } } = this.props
    const data = Object.assign({}, fishes[key], orders[key])
    data.quantity = data.quantity
      ? data.quantity + 1
      : 1
    addOrder({ [key]: data })
  }

  removeToOrder (key) {
    const { removeOrder } = this.props
    removeOrder(key)
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
          removeOrder={this.removeToOrder}
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
  addOrder: PropTypes.func,
  removeOrder: PropTypes.func
}

Store.contextTypes = {
  store: PropTypes.object
}

export default connect(
  state => state,
  { loadSamples, addItem, removeItem, editItem, addOrder, removeOrder }
)(Store)
