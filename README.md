# react-context-props

[![Build Status](https://travis-ci.org/xaviervia/react-context-props.svg?branch=master)](https://travis-ci.org/xaviervia/react-context-props)
[![npm version](https://img.shields.io/npm/v/react-context-props.svg?maxAge=10000)](https://www.npmjs.com/package/react-context-props)

Decorate React Components so they can get context props as regular props.

## How

```javascript
import { getContextualizer, withPropsFromContext } from 'react-context-props'
import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'

function Text ({ children, color }) {
  return (
    <p color={color}>
      {children}
    </p>
  )
}

const ContextProps = getContextualizer({ color: PropTypes.string })
const TextWithColorFromContext = withPropsFromContext(['color'])(Text)

render(
  (
    <ContextProps color='red'>
      <div>
        <TextWithColorFromContext>
          This text will be red
        </TextWithColorFromContext>
      </div>
    </ContextProps>
  ),
  document.getElementById('main')
)
```

`react-context-props` comprises two functions (both higher order components):

- `getContextualizer`: allows you to generate a component that will receive certain props and put them in the React context. `getContextualizer` is called with a `propTypes` object describing the props that the resulting component will be able to recognize and put in the context.
- `withPropsFromContext`: decorates an already existing component so that the declared properties are captured from the React context and passed to it as regular props.

You don't need to use both of these functions: you can just use `getContextualizer` to generate components that can put props in the context and have components that are already aware of the context consuming those; or you can just use `withPropsFromContext` to decorate your components so that they can get certain props the regular way or from the context.

### Putting everything from the Contextualizer into a single prop

`getContextualizer` can also be called like:

```javascript
const ContextProps = getContextualizer(
  {
    background: PropTypes.string,
    color: PropTypes.string
  },
  'theme'
)
```

In this way, the prop in the React.context will be `theme` and it will contain an object with all the props passed to it. For example:

```javascript
<ContextProps color='red' background='green'>
  …
</ContextProps>
```

…will set a `theme` prop in the React.context containing `{color: 'red', background: 'green'}`.

## Install

```
npm install react-context-props
```

## Advantages

- Explicit declaration of the properties that are expected to be received from context.
- Components that will receive properties from `context` can be implemented as regular components and the context wrapping added later. Component reusability is improved by using this strategy.

## Useful for

- Making themeable components (main valid use case for `React.context`)

## Testing

1. Clone this repo.
2. `npm install`
3. `npm test`

## License

[The Unlicense](LICENSE)
