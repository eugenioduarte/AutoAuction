import { Vehicle } from '../types/vehicle'

export async function fetchVehicles(simulateError = false): Promise<Vehicle[]> {
  await new Promise((resolve) => setTimeout(resolve, 700))

  if (simulateError) {
    throw new Error('Failed to fetch vehicles')
  }

  // @ts-ignore
  const data: Vehicle[] = require('../../assets/vehicles.json')
  return data
}
