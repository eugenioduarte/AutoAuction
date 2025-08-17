import { navigatorManager } from '@/src/navigation/navigatorManager'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Image } from 'react-native'
import Header from './Header'

jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: () => ({
    colors: { primary: 'blue', tertiary: 'gray' },
    spacings: { small: 5, medium: 10 },
    border: { size: 1 },
  }),
}))

jest.mock('@/assets/icons', () => ({
  FavoriteIcon: () => null,
}))

jest.mock('@/assets/images', () => ({
  logoImage: 'logoImage',
}))

jest.mock('@/src/constants/sizes', () => ({
  sizes: { ICON_SIZE_DEFAULT: 24, ICON_LOGO_SIZE: 32 },
}))

jest.mock('@/src/navigation/navigatorManager', () => ({
  navigatorManager: {
    goToVehiclesListScreen: jest.fn(),
    openDrawer: jest.fn(),
  },
}))

jest.mock('../button/Button', () => {
  const React = require('react')
  const { Pressable } = require('react-native')
  const ButtonMock = ({ onPress, children, testID, style }: any) => (
    <Pressable onPress={onPress} testID={testID} style={style}>
      {children}
    </Pressable>
  )
  ButtonMock.displayName = 'Button'
  return ButtonMock
})

jest.mock('../text/Text', () => {
  const React = require('react')
  const { Text } = require('react-native')
  const TextMock = ({ children, ...rest }: any) => (
    <Text {...rest}>{children}</Text>
  )
  TextMock.displayName = 'Text'
  return TextMock
})

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the logo with correct size and source', () => {
    const { UNSAFE_getByType } = render(<Header />)
    const img = UNSAFE_getByType(Image)
    expect(img.props.source).toBe('logoImage')
    expect(img.props.style).toEqual(
      expect.objectContaining({ width: 32, height: 32 }),
    )
  })

  it('navigates to the list when logo is pressed', () => {
    const { getByTestId } = render(<Header />)
    fireEvent.press(getByTestId('header-logo-btn'))
    expect(navigatorManager.goToVehiclesListScreen).toHaveBeenCalledTimes(1)
  })
})
