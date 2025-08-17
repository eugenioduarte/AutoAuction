import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { asyncStorage } from '../storage/asyncStorage'
import { Vehicle } from '../types/vehicle.type'

type Status = 'idle' | 'loading' | 'error' | 'success'

interface VehiclesState {
  items: Vehicle[]
  filteredItems: Vehicle[]
  status: Status
  error?: string
  isFilterActive?: boolean
  setStatus: (status: Status) => void
  setError: (error?: string) => void
  setItems: (items: Vehicle[]) => void
  reset: () => void
  toggleFavourite: (id: string) => void
  vehicleIsFavouriteById: (id: string) => boolean
  setFilteredItems: (filtered: Vehicle[]) => void
  setFilterActive: (isActive: boolean) => void
}

export const useVehiclesStore = create<VehiclesState>()(
  persist(
    (set, get) => ({
      items: [],
      filteredItems: [],
      status: 'idle',
      error: undefined,
      setStatus: (status) => set({ status }),
      setError: (error) => set({ error }),
      setItems: (items) => set({ items }),
      reset: () => set({ items: [], status: 'idle', error: undefined }),
      toggleFavourite: (id: string) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, favourite: !item.favourite } : item,
          ),
        })),
      vehicleIsFavouriteById: (id: string) =>
        !!get().items.find((item) => item.id === id)?.favourite,
      setFilteredItems: (filtered) => set({ filteredItems: filtered }),
      setFilterActive: (isActive: boolean) =>
        set(() => ({
          isFilterActive: isActive,
        })),
    }),
    {
      name: 'vehicles-store',
      storage: createJSONStorage(() => asyncStorage),
    },
  ),
)
