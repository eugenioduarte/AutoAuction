import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import Button from './Button'

jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: () => ({
    spacings: { small: 8, medium: 16 },
    colors: {
      primary: '#0000FF',
      disabled: '#CCCCCC',
      light_text: '#FFFFFF',
      text: '#333333',
    },
  }),
}))

jest.mock('../text/Text', () => {
  const { Text } = require('react-native')
  const MockText = (props: any) => <Text {...props}>{props.children}</Text>
  MockText.displayName = 'MockText'
  return MockText
})

describe('Button component', () => {
  it('renders string child and applies textProps', () => {
    const { getByText } = render(
      <Button
        textProps={{
          testID: 'button-text',
          style: { fontWeight: 'bold' },
          accessibilityLabel: 'Button label',
        }}
        variant="filled"
      >
        Click Me
      </Button>,
    )

    const text = getByText('Click Me')
    expect(text).toBeTruthy()
  })

  it('renders custom element child', () => {
    const { getByTestId } = render(
      <Button variant="outline">
        <Button testID="custom-child">Inner</Button>
      </Button>,
    )
    expect(getByTestId('custom-child')).toBeTruthy()
  })

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <Button disabled onPress={onPress}>
        Disabled
      </Button>,
    )
    fireEvent.press(getByText('Disabled'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('calls onPress when enabled', () => {
    const onPress = jest.fn()
    const { getByText } = render(<Button onPress={onPress}>Enabled</Button>)
    fireEvent.press(getByText('Enabled'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
