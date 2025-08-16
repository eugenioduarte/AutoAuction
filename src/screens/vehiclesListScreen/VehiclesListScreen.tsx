import {
  CarBrandContainer,
  Header,
  SearchFilterContainer,
  ViewContainer,
} from '@/src/components'
import VehiclesList from '@/src/screens/vehiclesListScreen/components/VehiclesList'
import React from 'react'

const VehiclesListScreen = () => {
  return (
    <ViewContainer>
      <Header />
      <CarBrandContainer />
      <SearchFilterContainer />
      <VehiclesList />
    </ViewContainer>
  )
}

export default VehiclesListScreen
