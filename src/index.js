import React, { PropTypes } from 'react'

export const getContextualizer = propTypes => {
  return React.createClass({
    displayName: 'ContextProps',

    childContextTypes: propTypes,

    getChildContext () {
      const props = Object.keys(this.props)
        .reduce((x, key) => {
          if (key !== 'children') {
            x[key] = this.props[key]
          }

          return x
        }, {})

      return props
    },

    render () {
      return <span>{this.props.children}</span>
    }
  })
}

export const withPropsFromContext = propList => Target =>
  React.createClass({
    displayName: Target.displayName || Target.name,

    contextTypes: propList.reduce(
      (x, prop) => {
        x[prop] = PropTypes.any
        return x
      },
      {}
    ),

    render () {
      const props = {
        ...propList.reduce(
          (x, prop) => {
            x[prop] = this.context[prop]

            return x
          },
          {}
        ),
        ...this.props
      }

      return (
        <Target {...props} />
      )
    }
  })
