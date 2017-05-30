import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const getContextualizer = (propTypes, targetProp) => {
  class ContextProps extends Component {
    getChildContext() {
      const props = Object.keys(this.props).reduce((x, key) => {
        if (key !== 'children') {
          x[key] = this.props[key]
        }

        return x
      }, {})

      return targetProp ? { [targetProp]: props } : props
    }

    render() {
      return <span>{this.props.children}</span>
    }
  }

  ContextProps.displayName = 'ContextProps'

  ContextProps.childContextTypes = targetProp
    ? { [targetProp]: PropTypes.shape(propTypes) }
    : propTypes
  return ContextProps
}

export const withPropsFromContext = propList => Target => {
  class WithPropsFromContext extends Component {
    render() {
      const props = {
        ...propList.reduce((x, prop) => {
          x[prop] = this.context[prop]

          return x
        }, {}),
        ...this.props,
      }

      return <Target {...props} />
    }
  }

  WithPropsFromContext.contextTypes = propList.reduce((x, prop) => {
    x[prop] = PropTypes.any
    return x
  }, {})

  WithPropsFromContext.displayName = Target.displayName || Target.name

  return WithPropsFromContext
}
