import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { getContextualizer, withPropsFromContext } from '../'

function Text({ label, color }) {
  return <p style={{ color }}>{label}</p>
}

function TextThatUsesTheme({ label, theme }) {
  return <p style={{ color: theme.mainColor }}>{label}</p>
}

const Contextualizer = getContextualizer({ color: PropTypes.string })
const TextThatGetsColorFromContext = withPropsFromContext(['color'])(Text)
const ContextualizeToProp = getContextualizer({ mainColor: PropTypes.string }, 'theme')
const TextThatUsesThemeAndGetsColorFromContext = withPropsFromContext(['theme'])(TextThatUsesTheme)

render(
  <div>
    <h2>All text here is red</h2>
    <Contextualizer color="red">
      <TextThatGetsColorFromContext label="Lorem ipsum" />
      <TextThatGetsColorFromContext label="Dolor sit amet" />
    </Contextualizer>

    <h2>All text here is green</h2>
    <Contextualizer color="green">
      <TextThatGetsColorFromContext label="Lorem ipsum" />
      <TextThatGetsColorFromContext label="Dolor sit amet" />
    </Contextualizer>

    <h2>All text here is blue</h2>
    <ContextualizeToProp mainColor="blue">
      <TextThatUsesThemeAndGetsColorFromContext label="Lorem ipsum" />
      <TextThatUsesThemeAndGetsColorFromContext label="Dolor sit amet" />
    </ContextualizeToProp>

    <h2>All text here is yellow</h2>
    <ContextualizeToProp mainColor="yellow">
      <TextThatUsesThemeAndGetsColorFromContext label="Lorem ipsum" />
      <TextThatUsesThemeAndGetsColorFromContext label="Dolor sit amet" />
    </ContextualizeToProp>
  </div>,
  document.getElementById('react-context-props')
)
