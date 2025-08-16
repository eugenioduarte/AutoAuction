// src/hooks/useVehiclesDetailsScreen.ts

import { Vehicle } from '@/src/types/vehicle.type'
import { useVehiclesStore } from '../../store/vehicles.store'

type UseVehiclesDetailsScreenReturn = {
  vehicle?: Vehicle
  toggleFavourite: () => void
  isFavourite: boolean
}

export const useVehiclesDetailsScreen = (
  id: string,
): UseVehiclesDetailsScreenReturn => {
  const vehicle = useVehiclesStore((state) =>
    state.items.find((item) => item.id === id),
  )

  const toggleFavourite = () => {
    if (vehicle) {
      useVehiclesStore.getState().toggleFavourite(id)
    }
  }

  const isFavourite = !!vehicle?.favourite

  return {
    vehicle,
    toggleFavourite,
    isFavourite,
  }
}
