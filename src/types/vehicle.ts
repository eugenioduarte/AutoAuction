export type FuelType = 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid'

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  startingBid: number
  mileage: number
  fuelType: FuelType
  engineSize: number
  auctionDateTime: string
  image?: string
}
