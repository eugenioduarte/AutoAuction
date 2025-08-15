import { useCallback, useEffect } from 'react'
import { fetchVehicles } from '../services/vehicles.service'
import { useVehiclesStore } from '../store/vehicles.store'

export function useGetVehiclesAvailable() {
  const { setStatus, setError, setItems, status, items, error } =
    useVehiclesStore()

  const loadVehicles = useCallback(async () => {
    setStatus('loading')
    setError(undefined)
    try {
      const data = await fetchVehicles()
      setItems(data)
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

  return { items, status, error, refresh: loadVehicles }
}
