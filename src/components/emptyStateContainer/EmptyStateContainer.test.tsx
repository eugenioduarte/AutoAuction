import { render } from '@testing-library/react-native'
import React from 'react'
import EmptyStateContainer from './EmptyStateContainer'

jest.mock('@/assets/icons', () => ({
  CarCrashIcon: (props: any) => {
    const { View } = require('react-native')
    return <View {...props} testID="car-crash-icon" />
  },
}))

jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: () => ({
    spacings: { medium: 10, large: 20 },
    colors: { primary: 'blue' },
    typography: {
      titleLarge: { fontSize: 20, fontWeight: 'bold' },
      body: { fontSize: 14 },
    },
  }),
}))
jest.mock('@/src/locales', () => ({
  t: (key: string) => {
    if (key === 'EmptyStateContainer.noVehiclesFound') {
      return 'No vehicles found'
    }
    return key
  },
}))

describe('EmptyStateContainer', () => {
  it('renders the CarCrashIcon with correct dimensions', () => {
    const { getByTestId } = render(<EmptyStateContainer />)
    const icon = getByTestId('car-crash-icon')
    expect(icon.props.width).toBe(70)
    expect(icon.props.height).toBe(70)
  })

  it('displays the correct text', () => {
    const { getByText } = render(<EmptyStateContainer />)
    expect(getByText('No vehicles found')).toBeTruthy()
  })
})
