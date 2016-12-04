import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Helmet from 'react-helmet'

import StoreForm from './StoreForm'
import style from './Home.sass'

class Home extends Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (ev) {
    ev.preventDefault()
    const { push } = this.props
    const storeName = ev.target.store.value
    push(`/store/${storeName}`)
  }

  render () {
    return (
      <div className={style.root}>
        <Helmet title='Home' />
        <h1>Please Enter a Store</h1>
        <StoreForm
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

Home.propTypes = {
  push: PropTypes.func
}

export default connect(
  state => state,
  { push }
)(Home)
