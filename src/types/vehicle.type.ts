export type FuelType = 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid'

export interface Vehicle {
  id: string
  make: string
  model: string
  engineSize: number
  year: number
  mileage: number
  startingBid: number
  auctionDateTime: string
  fuel: FuelType
  favourite?: boolean
}

export const brands = [
  'Audi',
  'BMW',
  'Citroen',
  'Ford',
  'Mercedes-Benz',
  'Toyota',
  'Volkswagen',
  'Volvo',
]
