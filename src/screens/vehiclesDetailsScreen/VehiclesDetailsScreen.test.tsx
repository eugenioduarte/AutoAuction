import { render } from '@testing-library/react-native'
import React from 'react'
import VehiclesDetailsScreen from './VehiclesDetailsScreen'
import { useVehiclesDetailsScreen } from './useVehiclesDetailsScreen'

jest.mock('./useVehiclesDetailsScreen', () => ({
  useVehiclesDetailsScreen: jest.fn(),
}))

jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: () => ({
    spacings: {
      xSmall: 4,
      small: 8,
    },
    colors: {
      primary: 'blue',
      grey: 'grey',
    },
    border: {
      radius: 4,
    },
  }),
}))

jest.mock('@/src/components', () => {
  const React = require('react')
  const { View, Text } = require('react-native')
  return {
    HeaderDetails: (props: any) => <View testID="HeaderDetails" {...props} />,
    ImageCar: (props: any) => <View testID="ImageCar" {...props} />,
    Text: ({ children, ...rest }: any) => <Text {...rest}>{children}</Text>,
    ViewContainer: ({ children, ...rest }: any) => (
      <View {...rest}>{children}</View>
    ),
  }
})

jest.mock('./components/VehiclesDetailsDescriptionsAuctionContainer', () => {
  const React = require('react')
  const { View } = require('react-native')
  return {
    __esModule: true,
    default: (props: any) => <View testID="AuctionContainer" {...props} />,
  }
})

jest.mock('@/assets/icons', () => ({
  CarIcon: () => <div>CarIcon</div>,
  EngineIcon: () => <div>EngineIcon</div>,
  FuelIcon: () => <div>FuelIcon</div>,
  MileageIcon: () => <div>MileageIcon</div>,
  ModelIcon: () => <div>ModelIcon</div>,
  YearIcon: () => <div>YearIcon</div>,
}))

jest.mock('./components/VehiclesDetailsDescriptionsAuctionContainer', () => {
  return {
    __esModule: true,
    default: (props: any) => <div testID="AuctionContainer" {...props} />,
  }
})

describe('VehiclesDetailsScreen', () => {
  const mockedUseVehiclesDetailsScreen = useVehiclesDetailsScreen as jest.Mock

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders nothing when no vehicle is available', () => {
    mockedUseVehiclesDetailsScreen.mockReturnValue({
      vehicle: null,
      toggleFavourite: jest.fn(),
      isFavourite: false,
    })
    const { toJSON } = render(
      <VehiclesDetailsScreen route={{ params: { id: '1' } }} />,
    )
    expect(toJSON()).toBeNull()
  })

  it('renders vehicle details correctly when vehicle is available', () => {
    const vehicleMock = {
      make: 'Mercedes-Benz',
      model: 'A-Class Saloon',
      engineSize: '1.8L',
      fuel: 'diesel',
      year: 2019,
      mileage: 15031,
      auctionDateTime: '2024/04/15 13:00:00',
      startingBid: 14000,
      favourite: false,
    }
    const toggleFavouriteMock = jest.fn()

    mockedUseVehiclesDetailsScreen.mockReturnValue({
      vehicle: vehicleMock,
      toggleFavourite: toggleFavouriteMock,
      isFavourite: true,
    })

    const { getByText, getByTestId } = render(
      <VehiclesDetailsScreen route={{ params: { id: '1' } }} />,
    )

    expect(getByTestId('HeaderDetails')).toBeTruthy()
    expect(getByTestId('ImageCar')).toBeTruthy()

    expect(getByText('Make')).toBeTruthy()
    expect(getByText('Mercedes-Benz')).toBeTruthy()
    expect(getByText('Model')).toBeTruthy()
    expect(getByText('A-Class Saloon')).toBeTruthy()
    expect(getByText('Engine Size')).toBeTruthy()
    expect(getByText('1.8L')).toBeTruthy()
    expect(getByText('Fuel')).toBeTruthy()
    expect(getByText(/diesel/i)).toBeTruthy()
    expect(getByText('Year')).toBeTruthy()
    expect(getByText('2019')).toBeTruthy()
    expect(getByText('Mileage')).toBeTruthy()
    expect(getByText(/15,?031/)).toBeTruthy()

    expect(getByTestId('AuctionContainer')).toBeTruthy()
  })
})
