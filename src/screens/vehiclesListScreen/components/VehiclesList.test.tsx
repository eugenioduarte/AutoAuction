/* eslint-disable react/display-name */
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { FlatList } from 'react-native'
import VehiclesList from './VehiclesList'

const mockedLoadMore = jest.fn()

jest.mock('@/src/hooks/useGetVehiclesAvailable', () => ({
  useGetVehiclesAvailable: () => ({
    items: [
      {
        id: '1',
        make: 'Toyota',
        model: 'C-HR',
        engineSize: '1.6L',
        fuel: 'petrol',
        year: 2019,
        mileage: 9403,
        auctionDateTime: '2024/04/15 09:00:00',
        startingBid: 16000,
        favourite: false,
      },
      {
        id: '2',
        model: '3 Series',
        engineSize: '1.8L',
        fuel: 'diesel',
        year: 2023,
        mileage: 1723,
        auctionDateTime: '2024/04/15 09:00:00',
        startingBid: 16000,
        favourite: true,
      },
    ],
    status: 'loaded',
    loadMore: mockedLoadMore,
  }),
}))

jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: () => ({
    spacings: { small: 10, medium: 20 },
  }),
}))

const useVehiclesStoreMock = {
  filteredItems: [] as any[],
  isFilterActive: false,
}
jest.mock('../../../store/vehicles.store', () => ({
  useVehiclesStore: () => useVehiclesStoreMock,
}))

jest.mock('@/src/components/emptyStateContainer/EmptyStateContainer', () => {
  const { View } = require('react-native')
  return () => <View testID="emptyState" />
})
jest.mock('./VehiclesListCard', () => {
  const { View } = require('react-native')
  return ({ vehicle }: any) => <View testID={`vehicleCard-${vehicle.id}`} />
})

describe('VehiclesList', () => {
  afterEach(() => {
    jest.clearAllMocks()
    useVehiclesStoreMock.filteredItems = []
    useVehiclesStoreMock.isFilterActive = false
  })

  it('renders FlatList with vehicle cards when vehicles are available', () => {
    const { queryByTestId, getByTestId } = render(<VehiclesList />)
    expect(getByTestId('vehicleCard-1')).toBeTruthy()
    expect(getByTestId('vehicleCard-2')).toBeTruthy()
    expect(queryByTestId('emptyState')).toBeNull()
  })

  it('renders only filtered vehicles when filter is active and has results', () => {
    useVehiclesStoreMock.filteredItems = [
      {
        id: '3',
        make: 'Citroen',
        model: 'C3 Origin',
        engineSize: '1.6L',
        fuel: 'petrol',
        year: 2023,
        mileage: 8690,
        auctionDateTime: '2024/04/15 09:00:00',
        startingBid: 17000,
        favourite: true,
      },
    ]
    useVehiclesStoreMock.isFilterActive = true
    const { getByTestId, queryByTestId } = render(<VehiclesList />)

    expect(getByTestId('vehicleCard-3')).toBeTruthy()
    expect(queryByTestId('vehicleCard-1')).toBeNull()
    expect(queryByTestId('vehicleCard-2')).toBeNull()
  })

  it('renders the empty state when filter is active and no vehicles match', () => {
    useVehiclesStoreMock.filteredItems = []
    useVehiclesStoreMock.isFilterActive = true
    const { getByTestId, queryByTestId } = render(<VehiclesList />)

    expect(getByTestId('emptyState')).toBeTruthy()
    expect(queryByTestId('vehicleCard-1')).toBeNull()
    expect(queryByTestId('vehicleCard-2')).toBeNull()
  })

  it('calls loadMore when FlatList reaches the end', () => {
    const { UNSAFE_getByType } = render(<VehiclesList />)
    const list = UNSAFE_getByType(FlatList)
    fireEvent(list, 'onEndReached')
    expect(mockedLoadMore).toHaveBeenCalled()
  })
})
