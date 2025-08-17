import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { useVehiclesStore } from '../../store/vehicles.store'
import CarBrandContainer from './CarBrandContainer'

jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: () => ({
    colors: {},
    spacings: {},
    border: {},
  }),
}))

jest.mock('@/src/types/vehicle.type', () => ({
  brands: ['Toyota', 'Honda'],
}))

jest.mock('./CarBrandButton', () => {
  const React = require('react')
  const { TouchableOpacity, Text } = require('react-native')

  const CarBrandButton = ({
    brand,
    onPress,
  }: {
    brand: string
    onPress: () => void
  }) => (
    <TouchableOpacity testID={`car-brand-button-${brand}`} onPress={onPress}>
      <Text>{brand}</Text>
    </TouchableOpacity>
  )
  CarBrandButton.displayName = 'CarBrandButton'
  return CarBrandButton
})

const mockedSetFilteredItems = jest.fn()
const dummyItems = [
  { id: '1', make: 'Toyota' },
  { id: '2', make: 'Honda' },
  { id: '3', make: 'Toyota' },
]
jest.mock('../../store/vehicles.store', () => ({
  useVehiclesStore: jest.fn(),
}))

beforeEach(() => {
  ;(useVehiclesStore as unknown as jest.Mock).mockReturnValue({
    items: dummyItems,
    filteredItems: dummyItems,
    setFilteredItems: mockedSetFilteredItems,
  })
  mockedSetFilteredItems.mockClear()
})

describe('CarBrandContainer', () => {
  it('filters items by brand when a brand button is pressed', () => {
    const { getByText } = render(<CarBrandContainer />)
    const toyotaButton = getByText('Toyota')

    fireEvent.press(toyotaButton)
    const expectedFiltered = dummyItems.filter((item) => item.make === 'Toyota')
    expect(mockedSetFilteredItems).toHaveBeenCalledWith(expectedFiltered)
  })

  it('resets filter when the selected brand is pressed again', () => {
    const { getByText } = render(<CarBrandContainer />)
    const hondaButton = getByText('Honda')

    fireEvent.press(hondaButton)
    const filtered = dummyItems.filter((item) => item.make === 'Honda')
    expect(mockedSetFilteredItems).toHaveBeenCalledWith(filtered)
    mockedSetFilteredItems.mockClear()

    fireEvent.press(hondaButton)
    expect(mockedSetFilteredItems).toHaveBeenCalledWith(dummyItems)
  })
})
