import { useCallback, useEffect, useState } from 'react'
import { fetchVehicles } from '../services/vehicles.service'
import { useVehiclesStore } from '../store/vehicles.store'

const PAGE_SIZE = 20

export function useGetVehiclesAvailable() {
  const { setStatus, setError, setItems, status, items, error } =
    useVehiclesStore()
  const [page, setPage] = useState(1)

  const loadVehicles = useCallback(async () => {
    setStatus('loading')
    setError(undefined)
    try {
      const vehicles = await fetchVehicles()

      const vehiclesWithId = vehicles.map((item, index) => ({
        ...item,
        id: (index + 1).toString(),
      }))

      setItems(vehiclesWithId)
      setStatus('success')
    } catch (err: any) {
      setError(err.message)
      setStatus('error')
    }
  }, [setStatus, setError, setItems])

  useEffect(() => {
    if (status === 'idle' || items.length === 0) {
      loadVehicles()
    }
  }, [loadVehicles, status, items.length])

  const paginatedItems = items.slice(0, page * PAGE_SIZE)

  const loadMore = () => {
    if (page * PAGE_SIZE < items.length) {
      setPage((prev) => prev + 1)
    }
  }

  return {
    items: paginatedItems,
    status,
    error,
    refresh: loadVehicles,
    loadMore,
  }
}
