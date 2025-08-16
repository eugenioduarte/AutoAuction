import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import CarBrandButton from './CarBrandButton'

const getBackgroundColor = (button: any) => {
  const styles = Array.isArray(button.props.style)
    ? button.props.style
    : [button.props.style]

  return styles.find((s: any) => s.backgroundColor)?.backgroundColor
}

jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: () => ({
    colors: {
      tertiary: 'gray',
      background: 'white',
      primary: 'blue',
    },
    spacings: {
      small: 8,
      xTiny: 4,
    },
    border: {
      size: 1,
      radius: 4,
    },
  }),
}))

jest.mock('@/assets/icons', () => {
  const React = require('react')
  const { TouchableOpacity } = require('react-native')

  return {
    AudiIcon: (props: any) => <TouchableOpacity testID="AudiIcon" {...props} />,
    BMWIcon: (props: any) => <TouchableOpacity testID="BMWIcon" {...props} />,
    CitroenIcon: (props: any) => (
      <TouchableOpacity testID="CitroenIcon" {...props} />
    ),
    FordIcon: (props: any) => <TouchableOpacity testID="FordIcon" {...props} />,
    MercedesBenzIcon: (props: any) => (
      <TouchableOpacity testID="MercedesBenzIcon" {...props} />
    ),
    ToyotaIcon: (props: any) => (
      <TouchableOpacity testID="ToyotaIcon" {...props} />
    ),
    VolkswagenIcon: (props: any) => (
      <TouchableOpacity testID="VolkswagenIcon" {...props} />
    ),
    VolvoIcon: (props: any) => (
      <TouchableOpacity testID="VolvoIcon" {...props} />
    ),
    BrandCarPlaceholderIcon: (props: any) => (
      <TouchableOpacity testID="DefaultIcon" {...props} />
    ),
  }
})

describe('CarBrandButton', () => {
  it('renders the correct icon for known brand (Audi)', () => {
    const { getByTestId } = render(<CarBrandButton brand="Audi" />)
    expect(getByTestId('AudiIcon')).toBeTruthy()
  })

  it('renders the default icon when the brand is unknown', () => {
    const { getByTestId } = render(<CarBrandButton brand="UnknownBrand" />)
    expect(getByTestId('DefaultIcon')).toBeTruthy()
  })

  it('calls onPress prop when pressed', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <CarBrandButton brand="Ford" onPress={onPressMock} />,
    )
    const button = getByTestId('brand-button-Ford')
    fireEvent.press(button)
    expect(onPressMock).toHaveBeenCalled()
  })

  it('applies selected style when isSelected is true', () => {
    const { getByTestId, rerender } = render(
      <CarBrandButton brand="Toyota" isSelected={false} />,
    )
    const button = getByTestId('brand-button-Toyota')

    const initialBackground = getBackgroundColor(button)
    expect(initialBackground).toBe('white')

    rerender(<CarBrandButton brand="Toyota" isSelected onPress={() => {}} />)
    const updatedButton = getByTestId('brand-button-Toyota')

    const updatedBackground = getBackgroundColor(updatedButton)
    expect(updatedBackground).toBe('blue')
  })
})
