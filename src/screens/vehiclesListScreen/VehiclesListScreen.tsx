import {
  CarBrandContainer,
  Header,
  SearchFilterContainer,
  ViewContainer,
} from '@/src/components'
import { useTheme } from '@/src/hooks/useTheme'
import { navigatorManager } from '@/src/navigation/navigatorManager'
import { VehiclesList } from '@/src/screens/vehiclesListScreen/components/VehiclesList'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const VehiclesListScreen = () => {
  const { colors, spacings, typography } = useTheme()
  return (
    <ViewContainer>
      <Header />
      <CarBrandContainer />
      <SearchFilterContainer />
      <VehiclesList />

      <TouchableOpacity
        onPress={() => navigatorManager.goToVehiclesDetailsScreen()}
      >
        <Text style={{ color: colors.primary }}>View More</Text>
      </TouchableOpacity>
    </ViewContainer>
  )
}

export default VehiclesListScreen
