import { useTheme } from '@/src/hooks/useTheme'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { useVehiclesStore } from '../../store/vehicles.store'
import FavoriteButton from './FavoriteButton'

jest.mock('@/assets/icons', () => ({
  FavoriteIcon: (props: any) => <svg {...props} testID="favorite-icon" />,
}))
jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: jest.fn(),
}))

jest.mock('../../store/vehicles.store', () => ({
  useVehiclesStore: jest.fn(),
}))

describe('FavoriteButton', () => {
  const dummyTheme = {
    colors: {
      surface: 'red',
      text: 'blue',
      primary: 'green',
      background: 'white',
    },
    spacings: {
      xSmall: 4,
    },
    border: {
      radius: 8,
    },
  }

  const vehicleId = '1'
  let toggleFavouriteMock: jest.Mock

  beforeEach(() => {
    toggleFavouriteMock = jest.fn()
    ;(useTheme as jest.Mock).mockReturnValue(dummyTheme)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly when vehicle is not favorite', () => {
    ;(useVehiclesStore as unknown as jest.Mock).mockImplementation(
      (arg: any) => {
        if (typeof arg === 'function') {
          return arg({ vehicleIsFavouriteById: () => false })
        }
        return { toggleFavourite: toggleFavouriteMock }
      },
    )

    const { getByTestId } = render(<FavoriteButton vehicleId={vehicleId} />)
    const icon = getByTestId('favorite-icon')
    expect(icon.props.stroke).toBe(dummyTheme.colors.text)
  })

  it('renders correctly when vehicle is favorite', () => {
    ;(useVehiclesStore as unknown as jest.Mock).mockImplementation(
      (arg: any) => {
        if (typeof arg === 'function') {
          return arg({ vehicleIsFavouriteById: () => true })
        }
        return { toggleFavourite: toggleFavouriteMock }
      },
    )

    const { getByTestId } = render(<FavoriteButton vehicleId={vehicleId} />)
    const icon = getByTestId('favorite-icon')
    expect(icon.props.stroke).toBe(dummyTheme.colors.surface)
  })

  it('calls toggleFavourite when pressed', () => {
    ;(useVehiclesStore as unknown as jest.Mock).mockImplementation(
      (arg: any) => {
        if (typeof arg === 'function') {
          return arg({ vehicleIsFavouriteById: () => false })
        }
        return { toggleFavourite: toggleFavouriteMock }
      },
    )

    const { getByTestId } = render(<FavoriteButton vehicleId={vehicleId} />)
    const container = getByTestId('favorite-button-container')
    fireEvent(container, 'touchEnd')
    expect(toggleFavouriteMock).toHaveBeenCalledWith(vehicleId)
  })
})
