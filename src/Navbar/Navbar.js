import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import fold from './action'
import style from './style.sass'

class Navbar extends Component {
  constructor () {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    const { store: { firebase: { helpers } } } = this.context
    helpers.logout()
  }

  render () {
    const { navbar, fold } = this.props

    return (
      <navbar className={style.root}>
        <div>
          <button
            type='button'
            className={style[`fold${navbar}`]}
            onClick={fold}
          >
            Fold
          </button>
        </div>
        <div className={style.navigation}>
          <Link to='/'>Change Store</Link>
          {this.props.name &&
            <span>{this.props.name}</span>
          }
          {this.props.uid &&
            <button type='button' onClick={this.handleLogout}>Log Out</button>
          }
        </div>
      </navbar>
    )
  }
}

Navbar.propTypes = {
  navbar: PropTypes.bool
}

Navbar.contextTypes = {
  store: PropTypes.object,
  fold: PropTypes.func
}

export default connect(
  ({ firebase, navbar }) => ({
    uid: firebase.uid,
    name: firebase.profile.displayName,
    navbar
  }),
  { fold }
)(Navbar)
