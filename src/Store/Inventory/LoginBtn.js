import React from 'react'
import Github from 'react-icons/lib/fa/github'
import Google from 'react-icons/lib/ti/social-google-plus'

import { properName } from '../../helpers'
import style from './style.sass'

const Icon = ({ provider, size }) => {
  switch (provider) {
    case 'github':
      return <Github size={size} />
    case 'google':
      return <Google size={size} />
    default:
      return <Github size={size} />
  }
}

export default ({ login, provider }) =>
  <button
    className={style[provider]}
    type='button'
    onClick={() => login(provider)}
  >
    <Icon provider={provider} size='30' />
    <span>
      Sign in with <strong>{properName(provider)}</strong>
    </span>
  </button>
