import {
  CarBrandContainer,
  Header,
  SearchFilterContainer,
  ViewContainer,
} from '@/src/components'
import { useGetVehiclesAvailable } from '@/src/hooks/useGetVehiclesAvailable'
import { useTheme } from '@/src/hooks/useTheme'
import { VehiclesList } from '@/src/screens/vehiclesListScreen/components/VehiclesList'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const VehiclesListScreen = () => {
  const { colors, spacings, typography } = useTheme()
  const { items, status, refresh } = useGetVehiclesAvailable()

  return (
    <ViewContainer>
      <Header />
      <CarBrandContainer />
      <SearchFilterContainer />
      <VehiclesList />

      <TouchableOpacity>
        <Text style={{ color: colors.primary }}>View More</Text>
      </TouchableOpacity>
    </ViewContainer>
  )
}

export default VehiclesListScreen
