import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { getContextualizer, withPropsFromContext } from '../'

function Text ({ label, color }) {
  return <p style={{ color }}>{label}</p>
}

const Contextualizer = getContextualizer({ color: PropTypes.string })
const TextThatGetsColorFromContext = withPropsFromContext(Text, ['color'])

render(
  <div>
    <h2>All text here is red</h2>
    <Contextualizer color='red'>
      <TextThatGetsColorFromContext label='Lorem ipsum' />
      <TextThatGetsColorFromContext label='Dolor sit amet' />
    </Contextualizer>

    <h2>All text here is green</h2>
    <Contextualizer color='green'>
      <TextThatGetsColorFromContext label='Lorem ipsum' />
      <TextThatGetsColorFromContext label='Dolor sit amet' />
    </Contextualizer>
  </div>
  , document.getElementById('react-context-props')
)
