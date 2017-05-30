import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'

import { getContextualizer, withPropsFromContext } from '../src/index.js'

const Text = ({ label, color }) => <p style={{ color }}>{label}</p>

const Contextualizer = getContextualizer({ color: PropTypes.string })
const TextThatGetsColorFromContext = withPropsFromContext(['color'])(Text)

const getColorContextualizer = color => (
  <Contextualizer color={color}>
    <TextThatGetsColorFromContext label='Lorem ipsum' />
    <TextThatGetsColorFromContext label='Dolor sit amet' />
  </Contextualizer>
)

describe('End to End Context Color', () => {
  test('`color` prop in Contextualizer is green', () => {
    const color = 'green'
    const GreenContext = getColorContextualizer(color)

    const wrapper = mount(GreenContext)

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find(Text).at(0).prop('color')).toBe(color)
    expect(wrapper.find(Text).at(1).prop('color')).toBe(color)
  })

  test('`color` prop in Contextualizer is red', () => {
    const color = 'red'
    const RedContext = getColorContextualizer(color)

    const wrapper = mount(RedContext)

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find(Text).at(0).prop('color')).toBe(color)
    expect(wrapper.find(Text).at(1).prop('color')).toBe(color)
  })
})
