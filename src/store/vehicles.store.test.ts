import { act } from '@testing-library/react-hooks'
import { asyncStorage } from '../storage/asyncStorage'
import { useVehiclesStore } from './vehicles.store'

jest.mock('../storage/asyncStorage', () => ({
  asyncStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}))

describe('useVehiclesStore', () => {
  beforeEach(() => {
    const { reset } = useVehiclesStore.getState()
    reset()
    jest.clearAllMocks()
  })

  it('should set status and error correctly', () => {
    const { setStatus, setError } = useVehiclesStore.getState()

    act(() => {
      setStatus('loading')
      setError('Something went wrong')
    })

    const { status, error } = useVehiclesStore.getState()
    expect(status).toBe('loading')
    expect(error).toBe('Something went wrong')
  })

  it('should set items', () => {
    const { setItems } = useVehiclesStore.getState()
    const items = [{ id: '1', name: 'Car A' } as any]

    act(() => {
      setItems(items)
    })

    expect(useVehiclesStore.getState().items).toEqual(items)
  })

  it('should reset store', () => {
    const { setItems, setStatus, setError, reset } = useVehiclesStore.getState()

    act(() => {
      setItems([{ id: '1', name: 'Car A' } as any])
      setStatus('success')
      setError('Error!')
      reset()
    })

    const { items, status, error } = useVehiclesStore.getState()
    expect(items).toEqual([])
    expect(status).toBe('idle')
    expect(error).toBeUndefined()
  })

  it('should toggle favourite correctly', () => {
    const { setItems, toggleFavourite, vehicleIsFavouriteById } =
      useVehiclesStore.getState()

    const items = [{ id: '1', name: 'Car A', favourite: false } as any]

    act(() => {
      setItems(items)
      toggleFavourite('1')
    })

    expect(vehicleIsFavouriteById('1')).toBe(true)

    act(() => {
      toggleFavourite('1')
    })

    expect(vehicleIsFavouriteById('1')).toBe(false)
  })

  it('should set filtered items', () => {
    const { setFilteredItems } = useVehiclesStore.getState()
    const filtered = [{ id: '2', name: 'Car B' } as any]

    act(() => {
      setFilteredItems(filtered)
    })

    expect(useVehiclesStore.getState().filteredItems).toEqual(filtered)
  })

  it('should persist to storage when items change', async () => {
    const { setItems } = useVehiclesStore.getState()
    const items = [{ id: '1', name: 'Car Persist' } as any]

    act(() => {
      setItems(items)
    })

    await Promise.resolve()

    expect(asyncStorage.setItem).toHaveBeenCalled()
  })
})
