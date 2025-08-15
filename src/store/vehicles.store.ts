import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { asyncStorage } from '../storage/asyncStorage'
import { Vehicle } from '../types/vehicle'

type Status = 'idle' | 'loading' | 'error' | 'success'

interface VehiclesState {
  items: Vehicle[]
  status: Status
  error?: string
  setStatus: (status: Status) => void
  setError: (error?: string) => void
  setItems: (items: Vehicle[]) => void
  reset: () => void
}

export const useVehiclesStore = create<VehiclesState>()(
  persist(
    (set) => ({
      items: [],
      status: 'idle',
      error: undefined,
      setStatus: (status) => set({ status }),
      setError: (error) => set({ error }),
      setItems: (items) => set({ items }),
      reset: () => set({ items: [], status: 'idle', error: undefined }),
    }),
    {
      name: 'vehicles-store',
      storage: createJSONStorage(() => asyncStorage),
    },
  ),
)
