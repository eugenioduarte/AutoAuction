import {
  FilterAction,
  filterReducer,
  FilterState,
  initialFilterState,
} from './filterReducer'

describe('filterReducer', () => {
  const customState: FilterState = {
    selectedMake: 'Toyota',
    selectedModel: 'Corolla',
    selectedFuel: 'Gasoline',
    selectedEngineSize: '2.0L',
    yearRange: ['2000', '2020'],
    mileageRange: ['10000', '50000'],
    auctionDateRange: ['2021-01-01', '2021-12-31'],
    startingBidRange: ['5000', '15000'],
    onlyFavourites: true,
  }

  it('should handle SET_MAKE and reset selectedModel', () => {
    const action: FilterAction = { type: 'SET_MAKE', payload: 'Honda' }
    const result = filterReducer(customState, action)
    expect(result.selectedMake).toBe('Honda')
    expect(result.selectedModel).toBeNull()
    expect(result.selectedFuel).toBe(customState.selectedFuel)
  })

  it('should handle SET_MODEL', () => {
    const action: FilterAction = { type: 'SET_MODEL', payload: 'Civic' }
    const result = filterReducer(customState, action)
    expect(result.selectedModel).toBe('Civic')
  })

  it('should handle SET_FUEL', () => {
    const action: FilterAction = { type: 'SET_FUEL', payload: 'Diesel' }
    const result = filterReducer(customState, action)
    expect(result.selectedFuel).toBe('Diesel')
  })

  it('should handle SET_ENGINE_SIZE', () => {
    const action: FilterAction = { type: 'SET_ENGINE_SIZE', payload: '1.8L' }
    const result = filterReducer(customState, action)
    expect(result.selectedEngineSize).toBe('1.8L')
  })

  it('should handle SET_YEAR', () => {
    const action: FilterAction = { type: 'SET_YEAR', payload: ['2010', '2020'] }
    const result = filterReducer(customState, action)
    expect(result.yearRange).toEqual(['2010', '2020'])
  })

  it('should handle SET_MILEAGE', () => {
    const action: FilterAction = {
      type: 'SET_MILEAGE',
      payload: ['20000', '60000'],
    }
    const result = filterReducer(customState, action)
    expect(result.mileageRange).toEqual(['20000', '60000'])
  })

  it('should handle SET_AUCTION_DATE', () => {
    const action: FilterAction = {
      type: 'SET_AUCTION_DATE',
      payload: ['2022-01-01', '2022-12-31'],
    }
    const result = filterReducer(customState, action)
    expect(result.auctionDateRange).toEqual(['2022-01-01', '2022-12-31'])
  })

  it('should handle SET_STARTING_BID', () => {
    const action: FilterAction = {
      type: 'SET_STARTING_BID',
      payload: ['7500', '20000'],
    }
    const result = filterReducer(customState, action)
    expect(result.startingBidRange).toEqual(['7500', '20000'])
  })

  it('should handle SET_ONLY_FAVOURITES', () => {
    const action: FilterAction = { type: 'SET_ONLY_FAVOURITES', payload: false }
    const result = filterReducer(customState, action)
    expect(result.onlyFavourites).toBe(false)
  })

  it('should handle RESET', () => {
    const action: FilterAction = { type: 'RESET' }
    const result = filterReducer(customState, action)
    expect(result).toEqual(initialFilterState)
  })

  it('should return the current state for an unknown action type', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: 'test',
    } as unknown as FilterAction
    const result = filterReducer(customState, action)
    expect(result).toEqual(customState)
  })
})
