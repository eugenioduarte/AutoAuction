/* eslint-disable react/display-name */
import { navigatorManager } from '@/src/navigation/navigatorManager'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import VehiclesListCard from './VehiclesListCard'

jest.mock('expo-localization', () => ({
  locale: 'en-US',
  locales: ['en-US'],
  timezone: 'Europe/Lisbon',
  getLocales: () => [
    {
      languageCode: 'en',
      countryCode: 'US',
      languageTag: 'en-US',
      isRTL: false,
    },
  ],
}))

// Mock dos ícones
jest.mock('@/assets/icons', () => ({
  CalendarIcon: ({ color }: { color: string }) => {
    const React = require('react')
    const { Text } = require('react-native')
    return <Text>{`CalendarIcon-${color}`}</Text>
  },
  GaugeIcon: ({ color }: { color: string }) => {
    const React = require('react')
    const { Text } = require('react-native')
    return <Text>{`GaugeIcon-${color}`}</Text>
  },
}))

// Mock do Badge
jest.mock('@/src/components/badge/Badge', () => {
  const React = require('react')
  const { Text } = require('react-native')
  return ({ title }: { title: string }) => <Text>{`Badge-${title}`}</Text>
})

// Mock do i18n
jest.mock('@/src/locales', () => ({
  t: (key: string) => key,
}))

// Mock do FavoriteButton e outros componentes
jest.mock('@/src/components', () => {
  const React = require('react')
  const { Text, TouchableOpacity } = require('react-native')
  return {
    FavoriteButton: ({ vehicleId }: { vehicleId: string }) => (
      <TouchableOpacity testID={`favorite-${vehicleId}`}>
        <Text>Fav</Text>
      </TouchableOpacity>
    ),
    Button: ({ children, onPress, ...props }: any) => (
      <TouchableOpacity onPress={onPress} {...props}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    ImageCar: () => <Text>ImageCar</Text>,
    Text: ({ children }: any) => <Text>{children}</Text>,
  }
})

// Mock do navigatorManager
jest.mock('@/src/navigation/navigatorManager', () => ({
  navigatorManager: { goToVehiclesDetailsScreen: jest.fn() },
}))

describe('VehiclesListCard', () => {
  const mockVehicle = {
    id: '1',
    make: 'Ford',
    model: 'Fiesta',
    engineSize: '1.6',
    fuel: 'petrol' as const,
    year: 2022,
    mileage: 9084,
    auctionDateTime: '2030/04/15 09:00:00',
    startingBid: 15000,
    favourite: false,
  }

  it('renders vehicle information correctly', () => {
    const { getByText } = render(<VehiclesListCard vehicle={mockVehicle} />)

    expect(getByText('Fiesta')).toBeTruthy()
    expect(getByText('Ford')).toBeTruthy()
    expect(getByText('2022')).toBeTruthy()
    expect(getByText('9084 km')).toBeTruthy()
    expect(getByText('15 000,00 €')).toBeTruthy()
  })

  it('navigates to details when button is pressed', () => {
    const { getByText } = render(<VehiclesListCard vehicle={mockVehicle} />)

    const button = getByText('vehiclesListCard.seeOffer')
    fireEvent.press(button)

    expect(navigatorManager.goToVehiclesDetailsScreen).toHaveBeenCalledWith({
      id: '1',
    })
  })
})
