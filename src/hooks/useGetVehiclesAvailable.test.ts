import { act, renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react-native'
import { fetchVehicles } from '../services/vehicles.service'
import { useVehiclesStore } from '../store/vehicles.store'
import { useGetVehiclesAvailable } from './useGetVehiclesAvailable'

jest.mock('../services/vehicles.service')
jest.mock('../store/vehicles.store')

const mockedFetchVehicles = fetchVehicles as jest.Mock
const mockedUseVehiclesStore = useVehiclesStore as unknown as jest.Mock

describe('useGetVehiclesAvailable', () => {
  let setStatus: jest.Mock
  let setError: jest.Mock
  let setItems: jest.Mock

  beforeEach(() => {
    setStatus = jest.fn()
    setError = jest.fn()
    setItems = jest.fn()

    mockedUseVehiclesStore.mockReturnValue({
      setStatus,
      setError,
      setItems,
      status: 'idle',
      items: [],
      error: undefined,
    })

    jest.clearAllMocks()
  })

  it('should load vehicles on mount when status is idle', async () => {
    const vehicles = [{ name: 'Car A' }, { name: 'Car B' }]
    mockedFetchVehicles.mockResolvedValue(vehicles)

    renderHook(() => useGetVehiclesAvailable())

    await waitFor(() => {
      expect(setStatus).toHaveBeenCalledWith('success')
    })

    expect(setStatus).toHaveBeenCalledWith('loading')
    expect(setError).toHaveBeenCalledWith(undefined)
    expect(setItems).toHaveBeenCalledWith(
      vehicles.map((item, index) => ({
        ...item,
        id: (index + 1).toString(),
      })),
    )
  })
  it('should handle errors during vehicle load', async () => {
    const errorMessage = 'Fetch failed'
    mockedFetchVehicles.mockRejectedValue(new Error(errorMessage))

    renderHook(() => useGetVehiclesAvailable())

    await waitFor(() => {
      expect(setStatus).toHaveBeenCalledWith('error')
    })

    expect(setStatus).toHaveBeenCalledWith('loading')
    expect(setError).toHaveBeenCalledWith(undefined)
    expect(setError).toHaveBeenCalledWith(errorMessage)
  })

  it('should paginate items and load more correctly', () => {
    const items = Array.from({ length: 30 }, (_, i) => ({
      id: (i + 1).toString(),
      name: `Car ${i + 1}`,
    }))
    mockedUseVehiclesStore.mockReturnValue({
      setStatus,
      setError,
      setItems,
      status: 'success',
      items,
      error: undefined,
    })

    const { result } = renderHook(() => useGetVehiclesAvailable())

    expect(result.current.items).toHaveLength(20)

    act(() => {
      result.current.loadMore()
    })

    expect(result.current.items).toHaveLength(30)
  })
})
