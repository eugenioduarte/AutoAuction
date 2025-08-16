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
