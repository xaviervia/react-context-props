import { mount } from 'enzyme'

import { getColorContextualizer, getThemeContextualizer, Text, ThemeText } from './e2e-helpers'

describe('Contextualizer without targetProp', () => {
  test('`color` prop is green', () => {
    const color = 'green'
    const wrapper = mount(getColorContextualizer(color))

    expect(wrapper.find(Text).at(0).prop('color')).toBe(color)
    expect(wrapper.find(Text).at(1).prop('color')).toBe(color)
  })

  test('`color` prop is red', () => {
    const color = 'red'
    const wrapper = mount(getColorContextualizer(color))

    expect(wrapper.find(Text).at(0).prop('color')).toBe(color)
    expect(wrapper.find(Text).at(1).prop('color')).toBe(color)
  })
})

describe('Contextualizer with targetProp', () => {
  test('`mainColor` prop in `theme` matches `blue`', () => {
    const mainColor = 'blue'
    const wrapper = mount(getThemeContextualizer(mainColor))

    expect(wrapper.find(ThemeText).at(0).prop('theme')).toMatchObject({ mainColor })
    expect(wrapper.find(ThemeText).at(0).prop('theme')).toMatchObject({ mainColor })
  })

  test('mainColor prop in theme matches `yellow`', () => {
    const mainColor = 'yellow'
    const wrapper = mount(getThemeContextualizer(mainColor))

    expect(wrapper.find(ThemeText).at(0).prop('theme')).toMatchObject({ mainColor })
    expect(wrapper.find(ThemeText).at(1).prop('theme')).toMatchObject({ mainColor })
  })
})
