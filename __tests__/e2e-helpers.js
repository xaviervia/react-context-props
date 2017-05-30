import React from 'react'
import PropTypes from 'prop-types'
import { getContextualizer, withPropsFromContext } from '../src/index'

const LOREM_IPSUM_TEXT = [
  'Lorem ipsum',
  'Dolor sit amet'
]

export function Text ({ color, label }) {
  return <p style={{ color }}>{label}</p>
}

export function ThemeText ({ theme, label }) {
  return <p style={{ color: theme.mainColor }}>{label}</p>
}

const TextWithContext = withPropsFromContext(['color'])(Text)
const ThemeTextWithContext = withPropsFromContext(['theme'])(ThemeText)

export function getThemeContextualizer (mainColor) {
  const Contextualizer = getContextualizer({ mainColor: PropTypes.string }, 'theme')

  return (
    <Contextualizer mainColor={mainColor}>
      <ThemeTextWithContext label={LOREM_IPSUM_TEXT[0]} />
      <ThemeTextWithContext label={LOREM_IPSUM_TEXT[1]} />
    </Contextualizer>
  )
}

export function getColorContextualizer (color) {
  const Contextualizer = getContextualizer({ color: PropTypes.string })

  return (
    <Contextualizer color={color}>
      <TextWithContext label={LOREM_IPSUM_TEXT[0]} />
      <TextWithContext label={LOREM_IPSUM_TEXT[1]} />
    </Contextualizer>
  )
}
